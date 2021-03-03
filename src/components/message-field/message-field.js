import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./message-field.scss";

import {
	createMessageDocument,
	updateMessageDocument,
} from "../../firebase/firebase.utils";
import {
	setMessageFieldContent,
	setEditing,
} from "../../redux/message-control/message-control.actions";

import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/close.svg";
import { ReactComponent as EmojiIcon } from "../../assets/icons/emoji.svg";

import EmojiPicker from "../../components/emoji-picker/emoji-picker";

const MessageField = ({
	currentUser,
	chatUser,
	editingMessage,
	messageFieldContent,
	mid,
	parentDoc,
	setMessageFieldContent,
	setEditing,
}) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	useEffect(() => {
		if (editingMessage) {
			inputRef.current.focus();
		}
	}, [editingMessage]);

	const handleInputChange = (event) => {
		if (!editingMessage) {
			setMessage(event.target.value);
		} else {
			setMessageFieldContent(event.target.value);
		}
	};

	const handleClearButtonClick = () => {
		setMessage("");
		inputRef.current.focus();
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!editingMessage) {
			if (message.length > 0) {
				createMessageDocument(message, currentUser, chatUser);
			}
			setMessage("");
			setShowEmojiPicker(false);
		} else {
			setEditing(false);
			updateMessageDocument(mid, parentDoc, "text", messageFieldContent);
			setMessageFieldContent("");
		}
	};

	const handleEmojiButtonClick = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const insertEmoji = (emoji) => {
		setMessage(`${message}${emoji}`);
		inputRef.current.focus();
	};

	return (
		<form className="message-field" onSubmit={handleFormSubmit}>
			<EmojiPicker show={showEmojiPicker} insertEmoji={insertEmoji} />
			<input
				type="text"
				placeholder="type your message..."
				className="message-field-input"
				value={editingMessage ? messageFieldContent : message}
				ref={inputRef}
				onChange={handleInputChange}
			/>
			<div className="icons">
				<EmojiIcon
					className="icon emoji-icon"
					onClick={handleEmojiButtonClick}
				/>
				<ClearIcon className="icon" onClick={handleClearButtonClick} />
				<button className="send-button" type="submit">
					<SendIcon className="icon" />
				</button>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		chatUser: state.chatUser.chatUser,
		editingMessage: state.messageControl.editingMessage,
		messageFieldContent: state.messageControl.messageFieldContent,
		mid: state.messageControl.mid,
		parentDoc: state.messageControl.parentDoc,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setMessageFieldContent: (messageFieldContent) => {
			dispatch(setMessageFieldContent(messageFieldContent));
		},
		setEditing: (editing) => {
			dispatch(setEditing(editing));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
