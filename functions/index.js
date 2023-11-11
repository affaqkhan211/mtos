const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51O8uBnLqgG0cdoTubKoVqnFDLUYVNmW7ID9fb2JxGArz7BIq04sb9PyoPkWNuD9LQV0J0U3CNIKSoXUINajSUbmR00BvQghRpx');

admin.initializeApp();

// Your Cloud Function for creating a usage record
exports.createUsageRecord = functions.firestore.document('{collection}/{token}/accounts/{accountId}')
    .onCreate(async (snapshot, context) => {
        const accountId = context.params.accountId;
        const token = context.params.token;
        const collection = context.params.collection;

        // Check if the document is in the drivers or admins collection
        if (collection === 'drivers' || collection === 'admins') {
            // Get the subowneruid from the driver or admin document
            const subownerUid = snapshot.get('subowneruid');

            // Charge the subowner
            await chargeSubowner(subownerUid, token);
        }

        return null;
    });

async function chargeSubowner(subownerUid, token) {
    // Use subownerUid to fetch additional details if needed
    // For example, you might have a 'subOwners' collection where you store additional information about subowners

    // Now charge the subowner using the Stripe API
    const subowner = await admin.firestore().collection('subOwners').doc(token).get();
    const subownerData = subowner.data();

    if (subownerData && subownerData.stripeId) {
        // Create a usage record in Stripe
        const usageRecord = await stripe.usageRecords.create({
            quantity: 1,  // Assuming you charge $100 for each account
            subscription_item: 'price_1OAg3vLqgG0cdoTuUIpkrJoW',  // Replace with your actual subscription item ID
            timestamp: Math.floor(Date.now() / 1000),
        });

        // Log the created usage record
        console.log('Usage record created:', usageRecord);

        // You can update your Firestore document to track the usage record if needed
        await admin.firestore().collection('subOwners').doc(token).collection('accounts').doc(subownerUid)
            .update({
                usageRecordId: usageRecord.id,
            });

        // Charge the subowner using the Stripe API
        await stripe.paymentIntents.create({
            amount: 10000,  // Amount in cents, adjust as needed
            currency: 'usd',
            customer: subownerData.stripeId,
            description: 'Charge for creating an account',
            metadata: {
                accountId: subownerUid,
                usageRecordId: usageRecord.id,
            },
        });

        console.log('Subowner charged successfully');
    } else {
        console.error('Subowner not found or missing Stripe customer ID');
    }
}