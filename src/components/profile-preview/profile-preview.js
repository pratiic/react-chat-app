import React, { useState } from "react";
import { connect } from "react-redux";

import "./profile-preview.scss";

import { auth } from "../../firebase/firebase.utils";
import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";

import ProfilePicture from "../profile-picture/profile-picture";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import MenuItem from "../menu-item/menu-item";

const ProfilePreview = ({ currentUser }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const handleChevronDownIconClick = () => {
		setShowDropdown(!showDropdown);
	};

	const handleSignoutOptionClick = () => {
		auth.signOut();
		setShowDropdown(!showDropdown);
	};

	return (
		<div className="profile-preview">
			<React.Fragment>
				<DropdownMenu show={showDropdown}>
					<MenuItem
						text="sign out"
						clickHandler={handleSignoutOptionClick}
					/>
				</DropdownMenu>
				<ProfilePicture
					userLetter={getProfileLetter(currentUser)}
					profilePicture={getProfilePicture(currentUser)}
				/>
				<p className="username">
					{currentUser.username}{" "}
					<ChevronDownIcon
						className="icon"
						onClick={handleChevronDownIconClick}
					/>
				</p>
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
