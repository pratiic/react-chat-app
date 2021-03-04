import React from "react";
import { connect } from "react-redux";

import "./chat-welcome.scss";

import { toggleUsersContainer } from "../../redux/users-container/users-container.actions";

import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const ChatWelcome = ({
	currentUser,
	toggleUsersContainer,
	displayInSmallScreens,
}) => {
	return (
		<div className="chat-welcome">
			{!displayInSmallScreens ? (
				<div className="wrapper">
					<MenuIcon
						className="icon big"
						onClick={toggleUsersContainer}
					/>
				</div>
			) : null}
			<div className="content">
				<p>
					Hello{" "}
					<span className="username">{currentUser.username}</span>{" "}
				</p>
				<p>Just click on one of the users to start chat</p>
				<p>Have fun</p>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		displayInSmallScreens: state.usersContainer.displayInSmallScreens,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleUsersContainer: () => {
			dispatch(toggleUsersContainer());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWelcome);
