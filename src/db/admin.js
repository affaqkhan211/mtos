import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, query, where, deleteDoc, serverTimestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from '../mtos/db/config';

const auth = getAuth(); // Initialize Firebase Authentication

// Add admin by subowners
export const createAdmin = async (id, adminData, callback) => {
    // upload image
    try {

        if (id) {
            createUserWithEmailAndPassword(auth, adminData.email, adminData.password)
                .then( async (userCredential) => {
                    const imageUrl = await uploadImage(adminData.imageUrl, 'dc9brvvux', 'jbno94oi');
                    adminData.imageUrl = imageUrl;
                    const user = userCredential.user;
                    const uid = user.uid; // Get the user'

                    // Create a reference to the admin document with the same ID as the user's UID
                    const adminRef = doc(db, "users", uid);

                    // Add timestamp fields
                    adminData.subOwneruid = id;
                    adminData.role = 'admin';
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
                    callback({ isSuccess: false, message: error.code });
                });
        } else {
            console.log("Session expired! Login again!");
            callback({ isSuccess: false, message: "User not authenticated." });
        }
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
    }


}

// update admin
export const updateAdminById = (adminId, adminData, callback) => {
    const adminRef = doc(db, "users", adminId);

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
    const adminsCollection = collection(db, 'users');
    const adminsQuery = query(adminsCollection, where('subOwneruid', '==', subOwnerUid), where('role', '==', 'admin'));

    const unsubscribe = onSnapshot(adminsQuery, (adminsSnapshot) => {
        const adminsData = [];

        adminsSnapshot.forEach((doc) => {
            // Include the 'id' field in the data
            const adminData = doc.data();
            adminData.id = doc.id;
            adminsData.push(adminData);
        });

        callback({ isSuccess: true, data: adminsData });
    }, (error) => {
        console.error('Error getting admins: ', error);
        callback({ isSuccess: false, message: error.message });
    });

};

export const deleteAdmin = (adminId, callback) => {
    const adminDocRef = doc(db, 'users', adminId);

    deleteDoc(adminDocRef)
        .then(() => {
            callback({ isSuccess: true, message: 'Admin deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting admin: ', error);
            callback({ isSuccess: false, message: error.message });
        });
};

const uploadImage = async (base64, cloudName, uploadPreset) => {
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const formData = new FormData();
        formData.append('file', `data:image/jpg;base64,${base64}`);
        formData.append('upload_preset', uploadPreset);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        };

        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url; // Return the URL of the uploaded image
        } else {
            console.error('Image upload failed. Cloudinary response:', data);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};