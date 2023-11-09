import { useState, useEffect } from "react";
import isUserPremium from "./isUserPremium";

const usePremiumStatus = (user) => { // Remove the type declaration
    const [premiumStatus, setPremiumStatus] = useState(false);

    useEffect(() => {
        if (user) {
            const checkPremiumStatus = async () => {
                setPremiumStatus(await isUserPremium());
            };
            checkPremiumStatus();
        }
    }, [user]);

    return premiumStatus;
}

export default usePremiumStatus;
