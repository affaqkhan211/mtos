const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripeSecretKey = 'sk_test_51O8uBnLqgG0cdoTuE35iUqdSEYDpMj1iultj3MWFLMkUAOknrlPDT2IEA9kVbRupPfT1icGCcMwYKLUhFf7iRtYD00ZoBR0Eai';

admin.initializeApp();
const stripe = require('stripe')(stripeSecretKey);
const { v4: uuid } = require('uuid');

// Cloud Function for creating a usage record
exports.createUsageRecord = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (snapshot, context) => {
    try {
      const role = snapshot.after.get('role');
      const isCounted = snapshot.after.get('isCounted');

      if (isCounted) {
        console.log('Already counted. Skipping business logic.');
        return null;
      } else {
        if (role === 'admin' || role === 'driver') {
          const subownerId = snapshot.after.get('subOwneruid');

          // Retrieve subowner's data from Firestore
          const subownerDoc = await admin.firestore().collection('users').doc(subownerId).get();
          const subownerData = subownerDoc.data();

          const timestamp = parseInt(Date.now() / 1000);

          if (subownerData && subownerData.stripeId) {
            // Retrieve the latest subscription document
            const latestSubscriptionDoc = await admin.firestore()
              .collection(`users/${subownerId}/subscriptions`)
              .orderBy('created', 'desc')
              .limit(1)
              .get();

            if (!latestSubscriptionDoc.empty) {
              const latestSubscription = latestSubscriptionDoc.docs[0].data();
              const subscriptionItemId = latestSubscription.items[0].id; // Assuming the 'id' field is at the third position

              // Charge the subowner for account creation
              const idempotencyKey = uuid();
              const usageRecord = await stripe.subscriptionItems.createUsageRecord(
                subscriptionItemId,
                {
                  quantity: 1,
                  timestamp: timestamp
                },
              );

              await snapshot.after.ref.update({ isCounted: true, usageRecord });

              console.log('Subowner charged successfully');
            } else {
              console.error('No subscription found for the subowner');
            }
          } else {
            console.error('Subowner not found or missing Stripe customer ID');
          }
        }
      }
    } catch (error) {
      console.error('Error in createUsageRecord:', error);
    }
  });

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
