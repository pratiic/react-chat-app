import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBkUPN4gO5yUn1bs7MQwVAINj-AXG1TAOs",
	authDomain: "react-chat-app-97999.firebaseapp.com",
	projectId: "react-chat-app-97999",
	storageBucket: "react-chat-app-97999.appspot.com",
	messagingSenderId: "750757163396",
	appId: "1:750757163396:web:67d60480e5eb67dc74add1",
	measurementId: "G-BDX0VYJF74",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider);
};

export const createUserDocument = (user) => {};
