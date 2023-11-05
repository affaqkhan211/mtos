import { collection, query, where, getDocs, documentId, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../config';

// get subowner about data
export const getSubOwnerById = (subOwnerId, callback) => {
    const subOwnersCollection = collection(db, "subOwners");
    const subOwnersQuery = query(subOwnersCollection, where(documentId(), "==", subOwnerId));

    try {
        getDocs(subOwnersQuery)
            .then((subOwnersSnapshot) => {
                const subOwnersData = {
                    isSuccess: true,
                    data: null, // Initialize data as null
                };

                subOwnersSnapshot.forEach((doc) => {
                    // Include the 'id' field in the data
                    const subOwnerData = doc.data();
                    subOwnerData.id = doc.id;
                    subOwnersData.data = subOwnerData; // Set data to the retrieved document
                });

                callback(subOwnersData);
            })
            .catch((error) => {
                console.error("Error getting subOwners: ", error);
                callback({ isSuccess: false });
            });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false });
    }
}

// update subowner about data
export const updateSubOwnerById = (subOwnerId, newData, callback) => {
    const subOwnerRef = doc(db, "subOwners", subOwnerId);

    try {
        updateDoc(subOwnerRef, newData)
            .then(() => {
                callback({ isSuccess: true });
            })
            .catch((error) => {
                console.error("Error updating subOwner: ", error);
                callback({ isSuccess: false });
            });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false });
    }
}

// delete specifc subowner by document id
export const deleteSubOwnerById = (subOwnerId, callback) => {
    const subOwnerRef = doc(db, "subOwners", subOwnerId);

    try {
        deleteDoc(subOwnerRef)
            .then(() => {
                callback({ isSuccess: true });
            })
            .catch((error) => {
                console.error("Error deleting subOwner: ", error);
                callback({ isSuccess: false });
            });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false });
    }
}