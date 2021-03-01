import React from "react";

import "./profile-picture.scss";

const ProfilePicture = ({ userLetter, profilePicture, size }) => {
	const profilePictureClass = `profile-picture ${size}`;

	return (
		<div className={profilePictureClass}>
			{profilePicture ? <img src={profilePicture} alt="" /> : userLetter}
		</div>
	);
};

export default ProfilePicture;
