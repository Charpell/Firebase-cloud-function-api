const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email
  }),
  databaseURL: `https://${functions.config().project.id}.firebaseio.com`
});

const db = admin.firestore();

module.exports = {
  db,
  admin
};
