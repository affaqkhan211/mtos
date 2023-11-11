import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from '../../mtos/db/config';

export const getAllDrivers = (callback) => {
    const driversRef = collection(db, "users");
    const q = query(driversRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const drivers = [];
        querySnapshot.forEach((doc) => {
            if (doc.role === 'admin') {
                drivers.push({ ...doc.data(), id: doc.id });
            }
        });
        callback({ isSuccess: true, data: drivers });
    }, (error) => {
        callback({ isSuccess: true, message: error.message });
    });

    // Return the unsubscribe function if needed later
    return unsubscribe;
};