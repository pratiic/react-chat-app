import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./message.scss";

import { firestore } from "../../firebase/firebase.utils";
import {
	getProfileLetter,
	getProfilePicture,
} from "../../utils/utils.components";

import ProfilePicture from "../profile-picture/profile-picture";

const Message = ({ text, self, currentUser, senderId }) => {
	const [sentBy, setSentBy] = useState(null);

	const getSentBy = async () => {
		if (self) {
			setSentBy({ ...currentUser });
		} else {
			const documentRef = await firestore
				.collection("users")
				.doc(senderId)
				.get();
			setSentBy({ ...documentRef.data() });
		}
	};

	useEffect(() => {
		getSentBy();
		//eslint-disable-next-line
	}, []);

	const messageContainerClassName = self
		? `message-container self`
		: `message-container`;

	return (
		<div className={messageContainerClassName}>
			<ProfilePicture
				userLetter={getProfileLetter(sentBy)}
				profilePicture={getProfilePicture(sentBy)}
				size="small"
			/>
			<div className="message">{text}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(Message);
