import React from "react";
import { connect } from "react-redux";

import "./chat-header.scss";

import { toggleUsersContainer } from "../../redux/users-container/users-container.actions";

import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const ChatHeader = ({ chatUser, toggleUsersContainer }) => {
	return (
		<div className="chat-header">
			<div className="wrapper">
				<MenuIcon className="icon big" onClick={toggleUsersContainer} />
				<div className="chat-user">
					{" "}
					<span className="username">{chatUser.username}</span>{" "}
					<span className="email"> {chatUser.email} </span>{" "}
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleUsersContainer: () => {
			dispatch(toggleUsersContainer());
		},
	};
};

export default connect(null, mapDispatchToProps)(ChatHeader);
