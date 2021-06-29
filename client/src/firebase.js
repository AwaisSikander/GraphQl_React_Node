import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBYIeLYiByI6G7y5Nkb_tTE5zlfywHc7BU",
  authDomain: "gqlreactnode00786.firebaseapp.com",
  projectId: "gqlreactnode00786",
  storageBucket: "gqlreactnode00786.appspot.com",
  // messagingSenderId: "606216867445",
  appId: "1:606216867445:web:5be5b2691d60facf12f23c",
  measurementId: "G-2M3767NY2N",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export {auth,googleAuthProvider}
{
  /* <script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script> */
}
//
{
  /* <script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script> */
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
