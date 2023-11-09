import { collection, addDoc, doc, setDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../mtos/db/config';

// Add a new document to a Firestore collection and update 'subOwners' collection
export const ChangeSubscriptionStatus = async (attachedData, data, callback) => {
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

// Listen for real-time updates to subscriptions for a specific UID
export const getSubscriptionDataByuid = (uid, callback) => {
    try {
        const subscriptionsCollectionRef = collection(db, 'subscriptions');

        // Create a query to retrieve subscriptions with a matching UID
        const q = query(subscriptionsCollectionRef, where("uid", "==", uid));

        // Create a real-time listener using onSnapshot
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const subscriptions = [];
            querySnapshot.forEach((doc) => {
                // Extract subscription data from each document
                subscriptions.push(doc.data());
            });

            // Call the callback function with the updated subscriptions
            callback({ isSuccess: true, data: subscriptions });
        });

        // Return the unsubscribe function to stop listening for updates
        return unsubscribe;
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
    }
};