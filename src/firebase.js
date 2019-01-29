import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-messaging";

const config = {
  apiKey: "AIzaSyCZ2k4d3SZ0UczsNXyu_PXZferruew1fDw",
  authDomain: "react-slack-clone-by-linh.firebaseapp.com",
  databaseURL: "https://react-slack-clone-by-linh.firebaseio.com",
  projectId: "react-slack-clone-by-linh",
  storageBucket: "react-slack-clone-by-linh.appspot.com",
  messagingSenderId: "876680504660"
};

firebase.initializeApp(config);
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   "BPBBrOxbwEFlN05dPNjgEQKg-kikvLfChtMmNBRaRQm1jsiNubs_R_xTU821j8YJXy0alg2vsLJb-c2fI5Rgxwo"
// );
export default firebase;
