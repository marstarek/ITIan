// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDuDhMbWjawU-kdtkldyr8hBdNmW7umiSk",
    authDomain: "iti-test-9412d.firebaseapp.com",
    databaseURL: "https://iti-test-9412d-default-rtdb.firebaseio.com",
    projectId: "iti-test-9412d",
    storageBucket: "iti-test-9412d.appspot.com",
    messagingSenderId: "138154878249",
    appId: "1:138154878249:web:df7256a5c49a800d450338",
    measurementId: "G-48XYX5C66D",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);