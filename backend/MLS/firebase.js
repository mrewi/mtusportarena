const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mtusportarena-2eaef.appspot.com'  // Find this in Firebase Console > Storage
  // storageBucket: 'your-firebase-storage-bucket-url'  // Find this in Firebase Console > Storage
});

const bucket = admin.storage().bucket();
