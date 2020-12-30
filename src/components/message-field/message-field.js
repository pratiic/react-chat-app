import React from "react";

import "./message-field.scss";

import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";

const MessageField = () => {
	return (
		<form className="message-field">
			<input
				type="text"
				placeholder="type your message..."
				className="message-field-input"
			/>
			<SendIcon className="icon" />
		</form>
	);
};

export default MessageField;
