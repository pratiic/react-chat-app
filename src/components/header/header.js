import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.scss";

import { auth } from "../../firebase/firebase.utils";

import ProfilePreview from "../profile-preview/profile-preview";
import Button from "../button/button";

const Header = ({ currentUser }) => {
	const handleSignOutButtonClick = () => {
		auth.signOut();
	};

	return (
		<div className="header">
			<div className="wrapper">
				<Link to="/chat">
					<h1 className="title capitalize">react chat</h1>
				</Link>
				{currentUser ? (
					<div className="profile-menu">
						<ProfilePreview />
						<Button
							secondary
							size="small"
							buttonClickHandler={handleSignOutButtonClick}
						>
							sign out
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(React.memo(Header));
