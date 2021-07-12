import firebase from "firebase";
import firebaseConfig from "../firebase-config";

const app =
	firebase.apps.length === 0
		? firebase.initializeApp(firebaseConfig)
		: firebase.app();

export const db = app.firestore();
