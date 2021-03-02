import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./message.scss";

import { firestore } from "../../firebase/firebase.utils";
import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import { ReactComponent as VerticalDotMenu } from "../../assets/icons/vertical-dot-menu.svg";

import ProfilePicture from "../profile-picture/profile-picture";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import MenuItem from "../menu-item/menu-item";

const Message = ({ text, self, currentUser, senderId, createdAt }) => {
	const [sentBy, setSentBy] = useState(null);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

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

	useEffect(() => {
		getSentBy();
		//eslint-disable-next-line
	}, []);

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

	const messageContainerClassName = self
		? `message-container self`
		: `message-container`;

	return (
		<div className={messageContainerClassName}>
			<ProfilePicture
				userLetter={getProfileLetter(sentBy)}
				profilePicture={getProfilePicture(sentBy)}
				size="small"
			/>
			<div className="message">{text}</div>
			<div className="created-at">{getCreatedTime(createdAt)}</div>
			<div className="message-control">
				<VerticalDotMenu
					className="icon vertical-dot-menu"
					onClick={handleVerticalDotMenuClick}
				/>
				<DropdownMenu show={showDropdownMenu}>
					<MenuItem text="remove" />
					<MenuItem text="edit" />
				</DropdownMenu>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(Message);
