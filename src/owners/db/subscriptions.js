import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from '../../mtos/db/config';

// Listen for real-time updates to all subscriptions
export const getAllSubscriptions = (callback) => {
    try {
        const subOwnersCollectionRef = collection(db, 'users');
        const userDocRef = doc(subOwnersCollectionRef);
        const subscriptionsCollectionRef = collection(userDocRef, 'subscriptions');
        // Create a real-time listener for the entire collection
        const unsubscribe = onSnapshot(subscriptionsCollectionRef, (querySnapshot) => {
            const subscriptions = [];
            querySnapshot.forEach((doc) => {
                if (doc.role === 'subOwner') {
                    subscriptions.push(doc.data());
                }
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
