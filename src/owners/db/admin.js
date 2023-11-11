import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from '../../mtos/db/config';

// Get all admins
export const getAllAdmins = (callback) => {
    const adminsCollection = collection(db, 'users');
    const adminsQuery = query(adminsCollection);

    const unsubscribe = onSnapshot(adminsQuery, (adminsSnapshot) => {
        const adminsData = [];

        adminsSnapshot.forEach((doc) => {
            // Include the 'id' field in the data
            const adminData = doc.data();
            adminData.id = doc.id;
            if (adminData.role === 'admin') {
                adminsData.push(adminData);
            }
        });

        callback({ isSuccess: true, data: adminsData });
    }, (error) => {
        console.error('Error getting admins: ', error);
        callback({ isSuccess: false, message: error.message });
    });

    return unsubscribe;
};