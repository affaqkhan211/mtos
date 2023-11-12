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
      const adminUid = tripData.adminuid;

      // Check if adminUid is defined
      if (!adminUid) {
        console.warn('Admin UID is undefined. Cannot send notifications.');
        return;
      }

      // Get the list of drivers with the same adminUid
      const driversSnapshot = await admin.firestore().collection('users')
        .where('role', '==', 'driver')
        .where('adminuid', '==', adminUid)
        .get();

      const uniqueTokensSet = new Set();
      // Iterate through driver documents and filter out duplicates
      const validDriverTokens = driversSnapshot.docs
        .map(driverDoc => driverDoc.get('FCMToken'))
        .filter(fcmToken => {
          if (fcmToken && !uniqueTokensSet.has(fcmToken)) {
            uniqueTokensSet.add(fcmToken);
            return true;
          }
          return false;
        });

      // Send FCM messages to drivers with valid tokens
      if (validDriverTokens.length > 0) {
        const payload = {
          notification: {
            title: 'New Trip Manifest Uploaded',
            body: 'Get ready for your trip!',
          },
        };

        await admin.messaging().sendToDevice(validDriverTokens, payload);
        console.log('Notifications sent successfully');
      } else {
        console.log('No drivers with valid FCM tokens to notify');
      }
    } catch (error) {
      console.error('Error in sendTripNotification:', error);
    }
  });

// Trip Assigning Notifications
// Cloud Function for sending notifications
exports.notifyDriverForActiveTrip = functions.firestore
  .document('trips/{tripId}')
  .onUpdate(async (change, context) => {
    try {
      const newTripData = change.after.data();
      const oldTripData = change.before.data();

      // Check if the trip status is updated to 'active' and isPickedUp is false
      if (
        newTripData.status === 'active' &&
        newTripData.pickedUp === false &&
        oldTripData.status !== 'active' // Ensure it wasn't active before the update
      ) {
        const driverId = newTripData.driverId;

        // Retrieve driver data from Firestore
        const driverDoc = await admin.firestore().collection('users').doc(driverId).get();
        const driverData = driverDoc.data();

        if (driverData && driverData.FCMToken) {
          // Notify the driver with FCMToken
          const payload = {
            notification: {
              title: 'Hurry Up! You Got a Trip!',
              body: `Pick client in ${newTripData['PU Time Request']} from ${newTripData['From Address']}`,
            },
          };

          await admin.messaging().sendToDevice(driverData.FCMToken, payload);
          console.log('Notification sent to the driver successfully');
        } else {
          console.log('Driver not found or missing FCMToken');
        }
      }
    } catch (error) {
      console.error('Error in notifyDriverForActiveTrip:', error);
    }
  });
