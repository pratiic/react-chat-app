import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./user.scss";

import { setChatUser } from "../../redux/chat-user/chat-user.actions";
import { toggleUsersContainer } from "../../redux/users-container/users-container.actions";

import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import ProfilePicture from "../profile-picture/profile-picture";

const User = ({
	user,
	setChatUser,
	currentUser,
	chatUser,
	toggleUsersContainer,
}) => {
	const { username, email, active } = user;
	const userClassName = active ? `user active` : `user`;

	useEffect(() => {}, [chatUser]);

	const handleUserClick = () => {
		setChatUser(user);
		toggleUsersContainer(false);
	};

	return (
		<div className={userClassName} onClick={handleUserClick}>
			<ProfilePicture
				userLetter={getProfileLetter(user)}
				profilePicture={getProfilePicture(user)}
			/>
			<div className="user-info">
				<p className="username">{username}</p>
				<p className="email">{email}</p>
			</div>
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
		toggleUsersContainer: (display) => {
			dispatch(toggleUsersContainer(display));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
