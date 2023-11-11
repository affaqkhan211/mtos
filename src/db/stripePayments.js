import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../mtos/db/config";

const getCheckoutUrlForCustom = async (priceId, token) => {
    const db = getFirestore(app);
    const checkoutSessionRef = collection(
        db,
        "users",
        token,
        "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionRef, {
        mode: 'subscription',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
        line_items: [
            {
                price: priceId,
            }
        ],

    });

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data();
            if (error) {
                unsubscribe();

                reject(error.message);
            }
            if (url) {
                console.log("Stripe Checkout URL:", url);
                unsubscribe();
                resolve(url);
            }
        });
    });
};

const getCheckoutUrlForBasic = async (priceId, token) => {
    const db = getFirestore(app);
    const checkoutSessionRef = collection(
        db,
        "users",
        token,
        "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,

    });

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data();
            if (error) {
                unsubscribe();

                reject(error.message);
            }
            if (url) {
                console.log("Stripe Checkout URL:", url);
                unsubscribe();
                resolve(url);
            }
        });
    });
};

const getPortalUrl = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    let dataWithUrl;
    try {
        const functions = getFunctions(app, "us-central1");
        const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-createPortalLink"
        );
        const { data } = await functionRef({
            customerId: user?.uid,
            returnUrl: window.location.origin,
        });

        // Add a type to the data
        dataWithUrl = data;
        console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    } catch (error) {
        console.log(error);
    }

    return new Promise((resolve, reject) => {
        if (dataWithUrl.url) {
            resolve(dataWithUrl.url);
        } else {
            reject(new Error("No url returned"));
        }
    });
};

const getPremiumStatus = async (token) => {
    try {
        const db = getFirestore(app);
        const subscriptionsRef = collection(db, "users", token, "subscriptions");
        const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));

        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    // In this implementation, we only expect one active or trialing subscription to exist.
                    console.log("Subscription snapshot", snapshot.docs.length);
                    if (snapshot.docs.length === 0) {
                        console.log("No active or trialing subscriptions found");
                        resolve(false);
                    } else {
                        console.log("Active or trialing subscription found");
                        resolve(true);
                    }
                    unsubscribe();
                },
                reject
            );
        });
    } catch (error) {

    }
};

export { getCheckoutUrlForBasic, getPortalUrl, getPremiumStatus, getCheckoutUrlForCustom };