import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./message.scss";

import {
	firestore,
	updateMessageDocument,
} from "../../firebase/firebase.utils";
import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";
import {
	setEditing,
	setMessageFieldContent,
} from "../../redux/message-control/message-control.actions";

import { ReactComponent as VerticalDotMenu } from "../../assets/icons/vertical-dot-menu.svg";

import ProfilePicture from "../profile-picture/profile-picture";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import MenuItem from "../menu-item/menu-item";

const Message = ({
	text,
	self,
	currentUser,
	senderId,
	createdAt,
	removed,
	parentDoc,
	mid,
	editingMessage,
	messageFieldContent,
	setEditing,
	setMessageFieldContent,
}) => {
	const [sentBy, setSentBy] = useState(null);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

	useEffect(() => {
		getSentBy();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!editingMessage && messageFieldContent) {
			updateMessageDocument(mid, parentDoc, "text", messageFieldContent);
			setMessageFieldContent("");
		}
		//eslint-disable-next-line
	}, [editingMessage]);

	const getMessageContainerClassName = () => {
		let messageContainerClassName = "message-container";
		if (self) {
			messageContainerClassName += " self";
		}

		if (removed) {
			console.log("pratiic");
			messageContainerClassName += " removed";
		}

		return messageContainerClassName;
	};

	const getSentBy = async () => {
		if (self) {
			setSentBy({ ...currentUser });
		} else {
			const documentRef = await firestore
				.collection("users")
				.doc(senderId)
				.get();
			setSentBy({ ...documentRef.data() });
		}
	};

	const getCreatedTime = (milliseconds) => {
		const date = new Date(milliseconds);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const amPm = hours > 12 ? "pm" : "am";
		return `${hours > 12 ? hours - 12 : hours}:${minutes} ${amPm}`;
	};

	const handleVerticalDotMenuClick = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	const handleRemoveOptionClick = () => {
		updateMessageDocument(mid, parentDoc, "removed", true);
		hideDropdownMenu();
	};

	const handleEditOptionClick = () => {
		setMessageFieldContent(text);
		setEditing(true);
		hideDropdownMenu();
	};

	const hideDropdownMenu = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	return (
		<div className={getMessageContainerClassName()}>
			<ProfilePicture
				userLetter={getProfileLetter(sentBy)}
				profilePicture={getProfilePicture(sentBy)}
				size="small"
			/>
			<div className="message">
				{removed ? "this message has been deleted" : text}
			</div>
			<div className="created-at">{getCreatedTime(createdAt)}</div>
			{self && !removed ? (
				<div className="message-control">
					<VerticalDotMenu
						className="icon vertical-dot-menu"
						onClick={handleVerticalDotMenuClick}
					/>
					<DropdownMenu show={showDropdownMenu}>
						<MenuItem
							text="remove"
							clickHandler={handleRemoveOptionClick}
						/>
						<MenuItem
							text="edit"
							clickHandler={handleEditOptionClick}
						/>
					</DropdownMenu>
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		editingMessage: state.messageControl.editingMessage,
		messageFieldContent: state.messageControl.messageFieldContent,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setEditing: (editing) => {
			dispatch(setEditing(editing));
		},
		setMessageFieldContent: (messageFieldContent) => {
			dispatch(setMessageFieldContent(messageFieldContent));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
