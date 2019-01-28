import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCZ2k4d3SZ0UczsNXyu_PXZferruew1fDw",
  authDomain: "react-slack-clone-by-linh.firebaseapp.com",
  databaseURL: "https://react-slack-clone-by-linh.firebaseio.com",
  projectId: "react-slack-clone-by-linh",
  storageBucket: "react-slack-clone-by-linh.appspot.com",
  messagingSenderId: "876680504660"
};

firebase.initializeApp(config);

export default firebase;
