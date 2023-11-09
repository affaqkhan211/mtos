import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../mtos/db/config';

// Listen for real-time updates to all subscriptions
export const getAllSubscriptions = (callback) => {
    try {
        const subscriptionsCollectionRef = collection(db, 'subscriptions');

        // Create a real-time listener for the entire collection
        const unsubscribe = onSnapshot(subscriptionsCollectionRef, (querySnapshot) => {
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
