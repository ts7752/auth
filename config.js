// 파이어베이스

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-ZRZ7r3VSJMMwy6U6yBBo7u4jL5e5aes",
  authDomain: "test-a7985.firebaseapp.com",
  databaseURL: "https://test-a7985-default-rtdb.firebaseio.com",
  projectId: "test-a7985",
  storageBucket: "test-a7985.appspot.com",
  messagingSenderId: "921455300323",
  appId: "1:921455300323:web:df1614717cbee1355affd6",
  measurementId: "G-DJJ7V6F5Q2",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
