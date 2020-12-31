import React from "react";

import "./chat.scss";

import MessageField from "../message-field/message-field";

const Chat = () => {
	return (
		<div className="chat">
			<div className="chat-main"></div>
			<MessageField />
		</div>
	);
};

export default Chat;
