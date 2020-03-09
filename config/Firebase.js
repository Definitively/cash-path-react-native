import firebase from "firebase";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAX9ya5NpuGpQi3iFcj9jqBNqX-JP1Ko64",
  authDomain: "cash-path-react-native-app.firebaseapp.com",
  databaseURL: "https://cash-path-react-native-app.firebaseio.com",
  projectId: "cash-path-react-native-app",
  storageBucket: "cash-path-react-native-app.appspot.com",
  messagingSenderId: "588314795773",
  appId: "1:588314795773:web:3a73ff19430f1f49796894",
  measurementId: "G-0YLDSCVPWN"
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default Firebase;
