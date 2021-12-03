// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDS92nWlcbRBQJzQ-rLZC8YXM3UgOyQA28",
    authDomain: "test-29153.firebaseapp.com",
    projectId: "test-29153",
    storageBucket: "test-29153.appspot.com",
    messagingSenderId: "295441365273",
    appId: "1:295441365273:web:9ccbc7d6af4845b56a6d88",
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDuDhMbWjawU-kdtkldyr8hBdNmW7umiSk",
//     authDomain: "test-29153.firebaseapp.com",
//     databaseURL: "https://test-29153-default-rtdb.firebaseio.com",
//     projectId: "test-29153",
//     storageBucket: "test-29153.appspot.com",
//     messagingSenderId: "138154878249",
//     appId: "1:138154878249:web:df7256a5c49a800d450338",
//     measurementId: "G-48XYX5C66D",
// };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);