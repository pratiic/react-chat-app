import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./chat.scss";

import { firestore } from "../../firebase/firebase.utils";

import MessageField from "../message-field/message-field";
import Message from "../message/message";

const Chat = ({ currentUser }) => {
	const [messages, setMessages] = useState([]);
	const [totalFetchedMessages, setTotalFetchedMessages] = useState(0);
	const [fetching, setFetching] = useState(false);
	const [top, setTop] = useState(0);
	const [totalMessages, setTotalMessages] = useState(0);

	const scrollDivBottom = useRef(null);
	const scrollDivTop = useRef(null);

	useEffect(() => {
		fetchMessages(25);
		setTotalFetchedMessages(25);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (top <= 0) {
			scrollDivBottom.current.scrollIntoView();
		}
		//eslint-disable-next-line
	}, [messages]);

	// useEffect(() => {
	// 	scrollDivTop.current.scrollIntoView();
	// 	console.log(scrollDivTop.current);
	// }, [totalFetchedMessages]);

	const fetchMessages = (fetchNumber) => {
		firestore.collection("messages").onSnapshot(async (snapshot) => {
			setFetching(true);
			const messagesRef = firestore.collection("messages");
			const messagesRefData = await messagesRef.get();
			setTotalMessages(messagesRefData.docs.length);
			const someKindOfThing = await messagesRef
				.orderBy("createdAt", "desc")
				.limit(fetchNumber)
				.get();
			const messagesFromFirestore = someKindOfThing.docs;
			setMessages(messagesFromFirestore);
			setFetching(false);
			setTop(0);
		});
	};

	const renderMessages = () => {
		const revMessages = reverseArray(messages);

		return revMessages.map((message) => {
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

	const handleLoadMoreClick = () => {
		fetchMessages(totalFetchedMessages + 25);
		setTotalFetchedMessages(totalFetchedMessages + 25);
		setTop(top + 1);
	};

	const renderLoadMoreButton = () => {
		return messages.length >= 25 && messages.length < totalMessages ? (
			<p className="load-more" onClick={handleLoadMoreClick}>
				{fetching ? "loading..." : "load more..."}
			</p>
		) : null;
	};

	return (
		<div className="chat">
			<div className="chat-main">
				{renderLoadMoreButton()}
				<div className="scroll" ref={scrollDivTop}></div>
				{renderMessages()}
				<div className="scroll" ref={scrollDivBottom}></div>
			</div>
			<MessageField />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(Chat);
