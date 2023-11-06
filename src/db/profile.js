import { collection, query, where, getDocs, documentId, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../mtos/db/config';

// get subowner about data
export const getSubOwnerById = (subOwnerId, callback) => {
    const subOwnersCollection = collection(db, "subOwners");
    const subOwnerDoc = doc(subOwnersCollection, subOwnerId);

    try {
        const unsubscribe = onSnapshot(subOwnerDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const subOwnerData = docSnapshot.data();
                // Include the 'id' field in the data
                subOwnerData.id = docSnapshot.id;

                const subOwnersData = {
                    isSuccess: true,
                    data: subOwnerData,
                };

                callback(subOwnersData);
            } else {
                // Document doesn't exist
                callback({ isSuccess: false, message: 'User not Found!' });
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false, message:error.message });
    }
};

// update subowner about data
export const updateSubOwnerById = (subOwnerId, newData, callback) => {
    const subOwnerRef = doc(db, "subOwners", subOwnerId);

    try {
        updateDoc(subOwnerRef, newData)
            .then(() => {
                callback({ isSuccess: true,  message: 'Profile Updated Successfully!' });
            })
            .catch((error) => {
                console.error("Error updating subOwner: ", error);
                callback({ isSuccess: false, message: error.message });
            });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false, message: error.message });
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