import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_test_51O8uBnLqgG0cdoTuNoIF8SiD0BzNycZcwTaFsxHOCSXot0PojCwGTt1nYZ4wEl6sE15XlRNZbqXTdAdCrUYaByvT001F1W31ob"
        );
    }
    return stripePromise;
}

export default initializeStripe;