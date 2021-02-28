import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./chat.scss";

import { firestore } from "../../firebase/firebase.utils";

import MessageField from "../message-field/message-field";
import Message from "../message/message";

const Chat = ({ currentUser }) => {
	const [messages, setMessages] = useState([]);

	const scrollDiv = useRef(null);

	useEffect(() => {
		firestore.collection("messages").onSnapshot(async (snapshot) => {
			const messagesRef = firestore.collection("messages");
			const someKindOfThing = await messagesRef
				.orderBy("createdAt")
				.get();
			const messagesFromFirestore = someKindOfThing.docs;
			setMessages(messagesFromFirestore);
		});
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		scrollDiv.current.scrollIntoView();
		console.log(scrollDiv.current);
	}, [scrollDiv]);

	return (
		<div className="chat">
			<div className="chat-main">
				{messages.map((message) => {
					const data = message.data();
					return (
						<Message
							text={data.text}
							key={data.mid}
							self={
								data.createdBy === currentUser.uid
									? true
									: false
							}
						/>
					);
				})}
				<div className="inner-chat-main" ref={scrollDiv}></div>
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
