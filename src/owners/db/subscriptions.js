import { collection, onSnapshot, query, getDocs, doc } from "firebase/firestore";
import { db } from '../../mtos/db/config';

// Listen for real-time updates to all subscriptions
export const getAllSubscriptions = async (callback) => {
    try {
        const usersCollectionRef = collection(db, 'users');

        // Fetch all user documents
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        const subscriptions = [];

        // Iterate through each user document
        usersQuerySnapshot.forEach(async (userDoc) => {
            const subscriptionsCollectionRef = collection(userDoc.ref, 'subscriptions');

            // Query the 'subscriptions' sub-collection for each user
            const subscriptionsQuerySnapshot = await getDocs(subscriptionsCollectionRef);

            // Extract subscription data from each subscription document
            subscriptionsQuerySnapshot.forEach((subscriptionDoc) => {
                subscriptions.push({
                    userId: userDoc.id,
                    subscriptionId: subscriptionDoc.id,
                    ...subscriptionDoc.data(),
                });
            });
        });

        // Call the callback function with the updated subscriptions
        callback({ isSuccess: true, data: subscriptions });
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
    }
};
