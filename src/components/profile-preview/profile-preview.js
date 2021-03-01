import React from "react";
import { connect } from "react-redux";

import "./profile-preview.scss";

import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import ProfilePicture from "../profile-picture/profile-picture";

const ProfilePreview = ({ currentUser }) => {
	return (
		<div className="profile-preview">
			<React.Fragment>
				<ProfilePicture
					userLetter={getProfileLetter(currentUser)}
					profilePicture={getProfilePicture(currentUser)}
				/>
				<p className="username">{currentUser.username}</p>
			</React.Fragment>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(ProfilePreview);
