import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../mtos/db/config';

// Add a new document to a Firestore collection and update 'subOwners' collection
export const addDocToCollection = async (attachedData, data, callback) => {
    const uid = attachedData.token;
    const subscriptionsCollectionRef = collection(db, 'subscriptions');
    const subOwnersDocRef = doc(db, 'subOwners', uid);

    try {
        // Add the data to the 'subscriptions' collection
        const subscriptionsDocRef = await addDoc(subscriptionsCollectionRef, data);

        await setDoc(subOwnersDocRef, { ...attachedData, uid });

        callback({ isSuccess: true, message: 'Subscribed Successfully!' });
    } catch (error) {
        console.error("Error adding document to collection: ", error);
        callback({ isSuccess: false, message: error.message });
    }
};
