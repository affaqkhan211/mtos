import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from '../../mtos/db/config';

export const getAllSubOwners = (callback) => {
    const subownersRef = collection(db, "subOwners");
    const q = query(subownersRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const subowners = [];
        querySnapshot.forEach((doc) => {
            subowners.push({ ...doc.data(), id: doc.id });
        });
        callback({ isSuccess: true, data: subowners });
    }, (error) => {
        callback({ isSuccess: true, message: error.message });
    });

    return unsubscribe;
};