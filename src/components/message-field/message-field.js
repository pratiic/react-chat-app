import React, { useState, useRef } from "react";

import "./message-field.scss";

import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/close.svg";

const MessageField = () => {
	const [message, setMessage] = useState("");

	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		setMessage(event.target.value);
	};

	const handleClearButtonClick = () => {
		setMessage("");
		inputRef.current.focus();
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form className="message-field" onSubmit={handleFormSubmit}>
			<input
				type="text"
				placeholder="type your message..."
				className="message-field-input"
				value={message}
				ref={inputRef}
				onChange={handleInputChange}
			/>
			<div className="icons">
				<button
					className="clear-button"
					onClick={handleClearButtonClick}
				>
					<ClearIcon className="icon" />
				</button>
				<button className="send-button" type="submit">
					<SendIcon className="icon" />
				</button>
			</div>
		</form>
	);
};

export default MessageField;
