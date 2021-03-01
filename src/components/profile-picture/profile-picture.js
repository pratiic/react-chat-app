import React from "react";

import "./profile-picture.scss";

const ProfilePicture = ({ userLetter, profilePicture, small }) => {
	const profilePictureClass = small
		? `profile-picture small`
		: `profile-picture`;

	return (
		<div className={profilePictureClass}>
			{profilePicture ? <img src={profilePicture} alt="" /> : userLetter}
		</div>
	);
};

export default ProfilePicture;
