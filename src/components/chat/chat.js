import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./chat.scss";

import { firestore } from "../../firebase/firebase.utils";
import { setChatUser } from "../../redux/chat-user/chat-user.actions";

import MessageField from "../message-field/message-field";
import Message from "../message/message";

const Chat = ({ currentUser, chatUser, setChatUser }) => {
	const [messages, setMessages] = useState([]);
	const [totalFetchedMessages, setTotalFetchedMessages] = useState(0);
	const [fetching, setFetching] = useState(false);
	const [top, setTop] = useState(0);
	const [totalMessages, setTotalMessages] = useState(0);
	const [noMessages, setNoMessages] = useState(false);
	const messageFetchNumber = 25;

	const scrollDivBottom = useRef(null);
	const scrollDivTop = useRef(null);

	useEffect(() => {
		if (chatUser) {
			fetchMessages(messageFetchNumber);
			setTotalFetchedMessages(messageFetchNumber);
		}
		//eslint-disable-next-line
	}, [chatUser]);

	useEffect(() => {
		if (top <= 0 && scrollDivBottom.current) {
			scrollDivBottom.current.scrollIntoView();
		}
		//eslint-disable-next-line
	}, [messages]);

	useEffect(() => {
		return () => {
			setChatUser(null);
		};
		//eslint-disable-next-line
	}, []);

	const fetchMessages = async (fetchNumber) => {
		// const currentToChatRef = firestore
		// 	.collection("chats")
		// 	.doc(`${currentUser.userId}${chatUser.userId}`)
		// 	.collection("messages");

		const chatToCurrentRef = firestore
			.collection("chats")
			.doc(`${chatUser.userId}${currentUser.userId}`)
			.collection("messages");
		const chatToCurrentData = await chatToCurrentRef.get();

		const docToFetch = chatToCurrentData.empty
			? `${currentUser.userId}${chatUser.userId}`
			: `${chatUser.userId}${currentUser.userId}`;

		firestore
			.collection("chats")
			.doc(docToFetch)
			.collection("messages")
			.onSnapshot(async (snapshot) => {
				setFetching(true);

				setNoMessages(false);

				const messagesRef = firestore
					.collection("chats")
					.doc(docToFetch)
					.collection("messages");

				const messagesRefData = await messagesRef.get();

				setTotalMessages(messagesRefData.docs.length);

				const someKindOfThing = await messagesRef
					.orderBy("createdAt", "desc")
					.limit(fetchNumber)
					.get();

				if (someKindOfThing.docs.length === 0) {
					console.log("pratik");
					setNoMessages(true);
				}

				setMessages(someKindOfThing.docs);

				setFetching(false);
				setTop(0);
			});
	};

	const renderMessages = () => {
		const sortedMessages = reverseArray(messages);

		return sortedMessages.map((message) => {
			const data = message.data();
			return (
				<Message
					text={data.text}
					key={data.mid}
					self={data.createdBy === currentUser.userId ? true : false}
					senderId={data.createdBy}
				/>
			);
		});
	};

	const reverseArray = (array) => {
		let reversedArray = [];

		for (let i = array.length - 1; i >= 0; i--) {
			reversedArray = [...reversedArray, array[i]];
		}

		return reversedArray;
	};

	// const sortArray = (array) => {
	// 	for (let i = 0; i < array.length; i++) {
	// 		for (let j = 0; j < array.length - i - 1; j++) {
	// 			if (array[j].data().createdAt > array[j + 1].data().createdAt) {
	// 				let temp = array[j];
	// 				array[j] = array[j + 1];
	// 				array[j + 1] = temp;
	// 			}
	// 		}
	// 	}

	// 	return array;
	// };

	const handleLoadMoreClick = () => {
		fetchMessages(totalFetchedMessages + messageFetchNumber);
		setTop(top + 1);
	};

	const renderLoadMoreButton = () => {
		return messages.length >= 25 && messages.length < totalMessages ? (
			<p className="load-more" onClick={handleLoadMoreClick}>
				{fetching ? "loading..." : "load more..."}
			</p>
		) : null;
	};

	const renderChat = () => {
		if (messages.length === 0 && !noMessages) {
			return (
				<p className="chat-title chat-title-small">
					Loading messages...
				</p>
			);
		}

		if (noMessages) {
			return <p className="chat-title chat-title-small">No messages</p>;
		}

		return (
			<React.Fragment>
				{renderLoadMoreButton()}
				<div className="scroll" ref={scrollDivTop}></div>
				{renderMessages()}
				<div className="scroll" ref={scrollDivBottom}></div>
			</React.Fragment>
		);
	};

	return (
		<div className="chat">
			{chatUser ? (
				<React.Fragment>
					<div className="chat-main">{renderChat()}</div>
					<MessageField />
				</React.Fragment>
			) : (
				<p className="chat-title">
					Click on one of the users to start chat
				</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		chatUser: state.chatUser.chatUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setChatUser: (chatUser) => {
			dispatch(setChatUser(chatUser));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
