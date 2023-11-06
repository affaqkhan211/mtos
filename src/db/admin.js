import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, query, where, getDocs, serverTimestamp, collection } from "firebase/firestore";
import { db } from '../mtos/db/config';

const auth = getAuth(); // Initialize Firebase Authentication

// Add admin by subowners
export const createAdmin = (id, adminData, callback) => {
    
    if (id) {
        createUserWithEmailAndPassword(auth, adminData.email, adminData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = user.uid; // Get the user's UID

                // Create a reference to the admin document with the same ID as the user's UID
                const adminRef = doc(db, "admins", uid);

                // Add timestamp fields
                adminData.subOwneruid = id;
                adminData.createdOn = serverTimestamp();

                // Set the document data
                setDoc(adminRef, adminData)
                    .then(() => {
                        callback({ isSuccess: true, message: "Admin Created Successfully!" });
                    })
                    .catch((error) => {
                        callback({ isSuccess: false, message: "Error adding admin document: " + error.message });
                    });
            })
            .catch((error) => {
                console.log("Error creating Admin: ", error);
                callback({ isSuccess: false, message: error.message });
            });
    } else {
        console.log("Session expired! Login again!");
        callback({ isSuccess: false, message: "User not authenticated." });
    }
}

// update admin
export const updateAdminById = (adminId, adminData, callback) => {
    const adminRef = doc(db, "admins", adminId);

    // Update the document with new data (without overwriting existing data)
    setDoc(adminRef, adminData, { merge: true })
        .then(() => {
            callback({ isSuccess: true, message: "Admin Updated Successfully!" });
        })
        .catch((error) => {
            callback({ isSuccess: false, message: "Error updating admin document: " + error.message });
        });
}

// get all adfmins related to this subowner
export const getAllAdmins = (subOwnerUid, callback) => {
    const adminsCollection = collection(db, "admins");

    // Create a query to find all admins with the specified subOwnerUid
    const adminsQuery = query(adminsCollection, where("subOwneruid", "==", subOwnerUid));

    getDocs(adminsQuery)
        .then((adminsSnapshot) => {
            const adminsData = [];

            adminsSnapshot.forEach((doc) => {
                // Include the 'id' field in the data
                const adminData = doc.data();
                adminData.id = doc.id;
                adminsData.push(adminData);
            });

            callback({ isSuccess: true, data: adminsData });
        })
        .catch((error) => {
            console.error("Error getting admins: ", error);
            callback({ isSuccess: false, message: error.message });
        });
}