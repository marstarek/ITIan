// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCY8Teuayo30P-Qqq3fKXD3agHPwhSFnGE",
    authDomain: "new-test-7e4d3.firebaseapp.com",
    projectId: "new-test-7e4d3",
    storageBucket: "new-test-7e4d3.appspot.com",
    messagingSenderId: "192071835621",
    appId: "1:192071835621:web:9243c79d3192897553990c",
    measurementId: "${config.measurementId}",
};
// const firebaseConfig = {
//     apiKey: "AIzaSyDuDhMbWjawU-kdtkldyr8hBdNmW7umiSk",
//     authDomain: "new-test-7e4d3.firebaseapp.com",
//     databaseURL: "https://new-test-7e4d3-default-rtdb.firebaseio.com",
//     projectId: "new-test-7e4d3",
//     storageBucket: "new-test-7e4d3.appspot.com",
//     messagingSenderId: "138154878249",
//     appId: "1:138154878249:web:df7256a5c49a800d450338",
//     measurementId: "${config.measurementId}",
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);