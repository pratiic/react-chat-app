import React from "react";

const ProfilePicture = ({ userLetter, profilePicture }) => {
	return (
		<div className="profile-picture">
			{profilePicture ? (
				<img src={profilePicture} alt="" className="profile-picture" />
			) : (
				{ userLetter }
			)}
		</div>
	);
};

export default ProfilePicture;
