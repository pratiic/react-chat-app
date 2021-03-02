import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./user.scss";

import {
	firestore,
	createContactDocument,
} from "../../firebase/firebase.utils";
import { setChatUser } from "../../redux/chat-user/chat-user.actions";

import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import ProfilePicture from "../profile-picture/profile-picture";

const User = ({ user, setChatUser, currentUser, chatUser }) => {
	const { username } = user;

	useEffect(() => {}, [chatUser]);

	const handleUserClick = () => {
		setChatUser(user);
	};

	return (
		<div className="user" onClick={handleUserClick}>
			<ProfilePicture
				userLetter={getProfileLetter(user)}
				profilePicture={getProfilePicture(user)}
			/>
			<div className="username">{username}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		chatUser: state.chatUser.chatUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setChatUser: (chatUser) => {
			dispatch(setChatUser(chatUser));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
