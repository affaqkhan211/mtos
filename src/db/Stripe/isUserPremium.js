import { auth } from "../../mtos/db/config"; // Fix the import

export default async function isUserPremium() {
    await auth.currentUser?.getIdToken(true);
    const decodedtoken = await auth.currentUser?.getIdTokenResult();

    return decodedtoken?.claims?.stripeRole ? true : false;
}
