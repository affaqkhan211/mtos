import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../mtos/db/config';

export const getPastTrips = async (callback) => {
    try {
        const tripsRef = collection(db, "trips");
        const pastTripsQuery = query(tripsRef);
        const querySnapshot = await getDocs(pastTripsQuery);

        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({ ...doc.data(), id: doc.id });
        });

        callback({ isSuccess: true, data: trips });
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
    }
};