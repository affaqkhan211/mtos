import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from './config';

// Create a signup function with email and password
export const SIGNUP = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;

        const userRef = doc(db, "subOwners", uid);
        const userData = {
            fullName: `${firstName} ${lastName}`,
            email: email,
            role: "subOwner",
            subscriptions: "none",
        };

        await setDoc(userRef, userData);
        console.log(userData);

        return userRef.id;
    } catch (error) {
        console.error("Error signing up:", error);
        return error.message;
    }
};

// Function to sign in a user with email and password
export const SIGNIN = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user.accessToken;
        
    } catch (error) {
        console.error("Error signing in:", error);
        return error.message;
    }
};

// GOOGLE

// Function to sign in a user with Google
export const SIGNIN_WITH_GOOGLE = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        return null;
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
                role: "subOwner",
                subscriptions: "none",
            };

            await setDoc(userRef, userData);
        } else {
            return "User Already Exists!";
        }

        return userRef.id;
    } catch (error) {
        console.error("Error signing up with Google:", error);
        return error.message;
    }
};