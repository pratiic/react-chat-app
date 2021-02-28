import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import "./message-field.scss";

import { createMessageDocument } from "../../firebase/firebase.utils";

import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/close.svg";

const MessageField = ({ currentUser }) => {
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
		if (message.length > 0) {
			createMessageDocument(message, currentUser);
		}
		setMessage("");
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
				<button className="send-button" type="submit">
					<SendIcon className="icon" />
				</button>
				<ClearIcon className="icon" onClick={handleClearButtonClick} />
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(MessageField);
