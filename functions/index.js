const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Constants
const SUBSCRIPTION_ITEM_ID = 'price_1OAg3vLqgG0cdoTuUIpkrJoW';
const ACCOUNT_CREATION_AMOUNT = 10000;  // $100 in cents
const CURRENCY = 'usd';

// Cloud Function for creating a usage record
exports.createUsageRecord = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snapshot, context) => {
        try {
            const userId = context.params.userId;
            const role = snapshot.get('role');

            if (role === 'admin' || role === 'driver') {
                const subownerId = snapshot.get('subowneruid');
                const token = 'your_token'; // Replace with the appropriate token for your use case
                await chargeSubowner(subownerId, token);
            }
        } catch (error) {
            console.error('Error in createUsageRecord:', error);
        }
    });

// Function to charge the subowner
async function chargeSubowner(subownerId, token) {
    try {
        const subownerDoc = await admin.firestore().collection('users').doc(subownerId).get();
        const subownerData = subownerDoc.data();

        if (subownerData && subownerData.stripeId) {
            const usageRecord = await stripe.usageRecords.create({
                quantity: 1,
                subscription_item: SUBSCRIPTION_ITEM_ID,
                timestamp: Math.floor(Date.now() / 1000),
            });

            await updateFirestoreDocument(subownerId, token, usageRecord.id);

            await stripe.paymentIntents.create({
                amount: ACCOUNT_CREATION_AMOUNT,
                currency: CURRENCY,
                customer: subownerData.stripeId,
                description: 'Charge for creating an account',
                metadata: {
                    accountId: subownerId,
                    usageRecordId: usageRecord.id,
                },
            });

            console.log('Subowner charged successfully');
        } else {
            console.error('Subowner not found or missing Stripe customer ID');
        }
    } catch (error) {
        console.error('Error in chargeSubowner:', error);
    }
}

// Function to update Firestore document with usage record ID
async function updateFirestoreDocument(subownerId, token, usageRecordId) {
    await admin.firestore()
        .collection('users')
        .doc(subownerId)
        .update({
            usageRecordId: usageRecordId,
        });
}


// Trip Notifications
// Cloud Function for sending notifications
exports.sendTripNotification = functions.firestore
  .document('trips/{tripId}')
  .onCreate(async (snapshot, context) => {
    try {
      const tripData = snapshot.data();
      const adminUid = tripData.adminUid;

      // Get the list of drivers with the same adminUid
      const driversSnapshot = await admin.firestore().collection('users')
        .where('role', '==', 'driver')
        .where('adminUid', '==', adminUid)
        .get();

      const driverTokens = driversSnapshot.docs.map(driverDoc => driverDoc.get('fcmToken'));

      // Send FCM messages to drivers
      if (driverTokens.length > 0) {
        const payload = {
          notification: {
            title: 'New Trip Manifest Uploaded',
            body: 'Get ready for your trip!',
          },
        };

        await admin.messaging().sendToDevice(driverTokens, payload);
        console.log('Notifications sent successfully');
      } else {
        console.log('No drivers to notify');
      }
    } catch (error) {
      console.error('Error in sendTripNotification:', error);
    }
  });
