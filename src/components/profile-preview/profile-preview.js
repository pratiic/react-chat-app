import React from "react";
import { connect } from "react-redux";

import "./profile-preview.scss";

import ProfilePicture from "../profile-picture/profile-picture";

const ProfilePreview = ({ currentUser }) => {
	return (
		<div className="profile-preview">
			<React.Fragment>
				<ProfilePicture
					userLetter={
						currentUser.displayName
							? currentUser.displayName[0]
							: currentUser.email[0]
					}
					profilePicture={
						currentUser.photoURL ? currentUser.photoURL : null
					}
				/>
				<p className="username">{currentUser.displayName}</p>
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
