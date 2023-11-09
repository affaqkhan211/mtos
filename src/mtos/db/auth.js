import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { auth, db } from './config';

// Create a signup function with email and password for subowners
export const SIGNUP = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;

        const userRef = doc(db, "subOwners", uid);
        const userData = {
            fullName: `${firstName} ${lastName}`,
            email: email,
            subscriptions: false,
            ownerAccounts: 1,
            adminAccounts: 0,
            driverAccounts: 0,
        };

        await setDoc(userRef, userData);
        console.log(userData);

        return { uid: uid, isSuccess: true };
    } catch (error) {
        console.error("Error signing up:", error);
        return { message: error.message, isSuccess: false };
    }
};

// Function to sign in a user with email and password
export const SIGNIN = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;

        // User not found in subOwners, check in the owners collection
        const ownersRef = collection(db, "owners");
        const ownerDoc = doc(ownersRef, uid);
        const ownerSnapshot = await getDoc(ownerDoc);

        if (ownerSnapshot.exists()) {
            // User found in owners, return their document
            return { uid, isSuccess: true, isOwner: true };
        }

        // User not found in subOwners or owners
        return { isSuccess: true, uid, isOwner: false };

    } catch (error) {
        return { isSuccess: false, message: error.message };
    }
};

// GOOGLE

// Function to sign in a user with Google
export const SIGNIN_WITH_GOOGLE = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return { uid: user.uid, isSuccess: true };
    } catch (error) {
        console.error("Error signing in with Google:", error);
        return { message: error.message, isSuccess: false };
    }
};

// Create a signup function with Google
export const SIGNUP_WITH_GOOGLE = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if the user already exists in your Firestore users collection
        const userRef = doc(db, "subOwners", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            // User doesn't exist, create a new user document in Firestore
            const userData = {
                fullName: user.displayName,
                email: user.email,
                subscriptions: false,
                ownerAccounts: 1,
                adminAccounts: 0,
                driverAccounts: 0,
                image: user.photoURL,
                phone: user.phoneNumber,
            };

            await setDoc(userRef, userData);
        } else {
            return { message: "User Already Exists!", isSuccess: false };
        }
        return { uid: user.uid, isSuccess: true };
    } catch (error) {
        console.error("Error signing up with Google:", error);
        return { message: error.message, isSuccess: false };
    }
};