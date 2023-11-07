import { collection, doc, onSnapshot, query, where, deleteDoc } from "firebase/firestore";
import { db } from "../mtos/db/config";

export const getAllDrivers = (uid, callback) => {
    const driversRef = collection(db, "drivers");
    const q = query(driversRef, where("subOwneruid", "==", "" + uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const drivers = [];
        querySnapshot.forEach((doc) => {
            drivers.push({ ...doc.data(), id: doc.id });
        });
        callback({ isSuccess: true, data: drivers });
    }, (error) => {
        callback({ isSuccess: true, message: error.message });
    });

    // Return the unsubscribe function if needed later
    return unsubscribe;
};

// export const deleteDriver = async (documentId, navigation, setActivity) => {
//     setActivity(true);
//     const driverRef = doc(db, "drivers", documentId);
//     deleteDoc(driverRef)
//         .then(() => {
//             // ShowToast("Driver deleted successfully!", 'success');
//             navigation.goBack();
//         })
//         .catch((error) => {
//             // ShowToast("Error deleting driver!", "danger");
//         })
//         .finally(() => {
//             setActivity(false);
//         });
// };

// export const updateDriver = async (documentId, updatedDetails, navigation, setActivity) => {
//     try {
//         const driversRef = collection(db, "drivers");
//         const driverRef = doc(db, "drivers", documentId);

//         const currentDriver = (await getDoc(driverRef)).data();

//         // Exclude current document from duplicate checks
//         const q1 = query(driversRef, where("idCard", "==", updatedDetails.idCard));
//         const q2 = query(driversRef, where("phoneNumber", "==", updatedDetails.phoneNumber));
//         const q3 = query(driversRef, where("pin", "==", updatedDetails.pin));
//         const q4 = query(driversRef, where("name", "==", updatedDetails.fullName));

//         const querySnapshots = await Promise.all([getDocs(q1), getDocs(q2), getDocs(q3), getDocs(q4)]);

//         // If a driver with the same details already exists, show an error message and return
//         if (querySnapshots.some(querySnapshot => !querySnapshot.empty
//             && querySnapshot.docs[0].id !== documentId)) {
//             // ShowToast("A driver with the same details already exists!", "danger");
//             setActivity(false);
//             return;
//         }

//         // Delete old image and upload new one if the image was changed
//         if (updatedDetails.imageUri !== currentDriver.imageUri) {
//             try {
//                 const imageUrl = await uploadImage(updatedDetails.imageUri, 'dc9brvvux', 'jbno94oi');
//                 updatedDetails.imageUri = imageUrl;
//             } catch (error) {
//                 // ShowToast("Error uploading image!", "danger");
//             }
//         }

//         updateDoc(driverRef, updatedDetails)
//             .then(() => {
//                 // ShowToast("Updated Driver", "success");
//                 navigation.goBack();
//             })
//             .catch((error) => {
//                 // ShowToast("Error updating driver!", "danger");
//             })
//             .finally(() => {
//                 setActivity(false);
//             })
//     } catch (error) {
//         console.log(error);
//     } finally {
//         setActivity(false);
//     }
// };