import initializeStripe from './initializeStripe';
import { db } from '../../mtos/db/config';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export const createCheckoutSession = async (uid) => {
    const checkoutSessionRef = await addDoc(
        collection(db, 'subOwners', uid, 'checkout_sessions'),
        {
            price: "price_1OAYriLqgG0cdoTuWUcsXoBY",
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        }
    );

    
    onSnapshot(checkoutSessionRef, async (snap) => {
        // console.log(snap.data().session);
        const { sessionId } = snap.data();
        const stripe = await initializeStripe(); // Fix the import
        stripe.redirectToCheckout({ sessionId });
    });
};
