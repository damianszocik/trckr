import * as firebase from "firebase";

// import { FirebaseConfig } from "./firebase/keys";
const FirebaseConfig = {
    apiKey: "AIzaSyDKhMyP_sD9ZIyi04wf5RhmjKCRA1-Kv24",
    authDomain: "trckr-test.firebaseapp.com",
    databaseURL: "https://trckr-test.firebaseio.com",
    projectId: "trckr-test",
    storageBucket: "trckr-test.appspot.com",
    messagingSenderId: "101088607200"
}
export default firebase.initializeApp(FirebaseConfig);