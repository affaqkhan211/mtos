import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../mtos/db/config';

// Add a new document to a Firestore collection and update 'subOwners' collection
export const addDocToCollection = async (attachedData, data, callback) => {
    const uid = attachedData.token;
    const subscriptionsCollectionRef = collection(db, 'subscriptions');
    const subOwnersDocRef = doc(db, 'subOwners', uid);

    try {
        // Add the data to the 'subscriptions' collection
        const subscriptionsData = {
            ...data,
            uid: uid, // Include the UID in the 'subscriptions' document
            subscribedAt: serverTimestamp() // Add a subscribedAt field with the current server timestamp
        };
        const subscriptionsDocRef = await addDoc(subscriptionsCollectionRef, subscriptionsData);

        // Update the 'subOwners' document with the specified fields
        const subOwnersUpdateData = {
            adminAccounts: attachedData.adminAccounts,
            ownerAccounts: attachedData.ownerAccounts,
            driverAccounts: attachedData.driverAccounts,
            subscribedAt: serverTimestamp(),
            subscriptions: true,
        };
        await setDoc(subOwnersDocRef, subOwnersUpdateData, { merge: true }); // Use merge to update specific fields

        callback({ isSuccess: true, message: 'Subscribed Successfully!' });
    } catch (error) {
        console.error("Error adding document to collection or updating 'subOwners' document: ", error);
        callback({ isSuccess: false, message: error.message });
    }
};
