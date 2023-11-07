import { collection, onSnapshot, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../mtos/db/config";

export const getTripsUploadedToday = (subOwneruid, callback) => {
    try {
        const tripsRef = collection(db, "trips");

        // Get the current date as a string in the format "YYYY-MM-DD"
        const now = new Date();
        const currentDate = new Date(
            now.getTime() - now.getTimezoneOffset() * 60000
        )
            .toISOString()
            .split("T")[0];

        // Create a query to filter trips where the "Date" field matches the current date
        const q = query(tripsRef, where("Date", "==", currentDate), where("subOwneruid", "==", subOwneruid));

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push({ ...doc.data(), id: doc.id });
            });

            // Call the provided callback with the updated data
            callback({ isSuccess: false, data: trips });
        });

        // Return the unsubscribe function in case you want to stop listening to updates
        return unsubscribe;
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
    }
};

export const getPastTrips = async (uid, callback) => {
    try {
        const tripsRef = collection(db, "trips");
        const pastTripsQuery = query(tripsRef, where("Status", "==", "completed"), where("subOwneruid", "==", uid), orderBy("Date"));
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