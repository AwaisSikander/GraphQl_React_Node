let authorized = true;

var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    console.log("CUrrENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.log("INVALID OR EXPIRED TOKEN", error)
    throw new Error('invalid or expired token')
  }
};
