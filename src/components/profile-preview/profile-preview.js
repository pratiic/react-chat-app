import React from "react";
import { connect } from "react-redux";

import "./profile-preview.scss";

import ProfilePicture from "../profile-picture/profile-picture";

const ProfilePreview = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<div className="profile-preview">
			{currentUser ? (
				currentUser.photoURL ? (
					<React.Fragment>
						<img
							src={currentUser.photoURL}
							className="profile-picture"
							alt="profile pic"
						></img>
						<p className="username">{currentUser.displayName}</p>
					</React.Fragment>
				) : (
					<React.Fragment>
						<ProfilePicture
							userLetter={
								currentUser.displayName
									? currentUser.displayName[0]
									: currentUser.email[0]
							}
						/>
						<p className="username">{currentUser.displayName}</p>
					</React.Fragment>
				)
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(ProfilePreview);
