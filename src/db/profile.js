import { collection, query, where, getDocs, documentId, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../mtos/db/config';

// get subowner about data
export const getSubOwnerById = (subOwnerId, callback) => {
    const subOwnersCollection = collection(db, "users");
    const subOwnerDoc = doc(subOwnersCollection, subOwnerId);

    try {
        const unsubscribe = onSnapshot(subOwnerDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const subOwnerData = docSnapshot.data();
                // Include the 'id' field in the data
                subOwnerData.id = docSnapshot.id;

                const subOwnersData = {
                    isSuccess: true,
                    data: subOwnerData,
                };

                callback(subOwnersData);
            } else {
                // Document doesn't exist
                callback({ isSuccess: false, message: 'User not Found!' });
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false, message: error.message });
    }
};

// update subowner about data
export const updateSubOwnerById = async (subOwnerId, newData, userProfile, callback) => {
    const subOwnerRef = doc(db, "users", subOwnerId);

    try {
        if (userProfile.image !== newData.image) {
            const imageUrl = await uploadImage(newData.image, 'dc9brvvux', 'jbno94oi');
            newData.image = imageUrl;
        }
    } catch (error) {
        callback({ isSuccess: false, message: error.message });
        console.log(error);
    }


    try {
        await updateDoc(subOwnerRef, newData)
            .then(() => {
                callback({ isSuccess: true, message: 'Profile Updated Successfully!' });
            })
            .catch((error) => {
                console.error("Error updating subOwner: ", error);
                callback({ isSuccess: false, message: error.message });
            });
    } catch (error) {
        console.error("Error: ", error);
        callback({ isSuccess: false, message: error.message });
    }
}

const uploadImage = async (base64, cloudName, uploadPreset) => {
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const formData = new FormData();
        formData.append('file', `data:image/jpg;base64,${base64}`);
        formData.append('upload_preset', uploadPreset);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        };

        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url; // Return the URL of the uploaded image
        } else {
            console.log('Image upload failed. Cloudinary response:', data);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};



// delete specifc subowner by document id
// export const deleteSubOwnerById = (subOwnerId, callback) => {
//     const subOwnerRef = doc(db, "subOwners", subOwnerId);

//     try {
//         deleteDoc(subOwnerRef)
//             .then(() => {
//                 callback({ isSuccess: true });
//             })
//             .catch((error) => {
//                 console.error("Error deleting subOwner: ", error);
//                 callback({ isSuccess: false });
//             });
//     } catch (error) {
//         console.error("Error: ", error);
//         callback({ isSuccess: false });
//     }
// }