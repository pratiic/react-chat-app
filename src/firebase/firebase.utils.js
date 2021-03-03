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

export const createUserDocument = async (user) => {
	const newUser = {
		username: user.displayName || user.email,
		email: user.email,
		photoURL: user.photoURL,
		userId: user.uid,
	};

	await firestore.collection("users").doc(user.uid).set(newUser);
};

export const createMessageDocument = async (message, currentUser, chatUser) => {
	const messagesCollectionRef = firestore
		.collection("chats")
		.doc(`${chatUser.userId}${currentUser.userId}`)
		.collection("messages");
	const messagesCollectionData = await messagesCollectionRef.get();

	const newMessage = {
		text: message,
		createdBy: currentUser.userId,
		createdAt: new Date().getTime(),
		mid: `${message}${currentUser.userId}${new Date().getTime()}`,
		parentDoc: messagesCollectionData.empty
			? `${currentUser.userId}${chatUser.userId}`
			: `${chatUser.userId}${currentUser.userId}`,
		removedForEveryone: false,
	};

	if (messagesCollectionData.empty) {
		await firestore
			.collection("chats")
			.doc(`${currentUser.userId}${chatUser.userId}`)
			.collection("messages")
			.doc(`${message}${currentUser.userId}${new Date().getTime()}`)
			.set(newMessage);
	} else {
		await messagesCollectionRef
			.doc(`${message}${currentUser.userId}${new Date().getTime()}`)
			.set(newMessage);
	}
};

export const updateMessageDocument = async (mid, parentDoc, field, value) => {
	const documentRef = await firestore
		.collection("chats")
		.doc(parentDoc)
		.collection("messages")
		.doc(mid);

	await documentRef.update({ [field]: value });
};

export const updateRemovedFor = async (mid, parentDoc, userId) => {
	await firestore
		.collection("chats")
		.doc(parentDoc)
		.collection("messages")
		.doc(mid)
		.collection("removedFor")
		.doc(userId)
		.set({ userId: userId });
};
