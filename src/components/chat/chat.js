import React, { useState } from "react";

import "./chat.scss";

import MessageField from "../message-field/message-field";
import Message from "../message/message";

const Chat = () => {
	const [messages, setMessages] = useState([]);

	const addMessage = (message) => {
		setMessages([...messages, { text: message, self: true }]);
	};

	return (
		<div className="chat">
			<div className="chat-main">
				{messages.map((message) => {
					return (
						<Message
							text={message.text}
							key={message.text}
							self={message.self}
						/>
					);
				})}
			</div>
			<MessageField addMessage={addMessage} />
		</div>
	);
};

export default Chat;
