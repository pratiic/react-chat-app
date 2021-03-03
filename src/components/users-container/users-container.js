import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./users-container.scss";

import { firestore } from "../../firebase/firebase.utils";

import User from "../user/user";

const UsersContainer = ({ currentUser, chatUser }) => {
	const [users, setUsers] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);

	useEffect(() => {
		fetchUsers();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		setNumberOfUsers(users.length);
	}, [users]);

	useEffect(() => {
		setUsers(
			users.map((user) => {
				if (user.userId === chatUser.userId) {
					return { ...user, active: true };
				}
				return { ...user, active: false };
			})
		);
		//eslint-disable-next-line
	}, [chatUser]);

	const fetchUsers = async () => {
		firestore.collection("users").onSnapshot((snapshot) => {
			console.log(snapshot);
			const usersDocs = snapshot.docs.map((doc) => {
				return { ...doc.data(), active: false };
			});
			setUsers(usersDocs);
		});
	};

	return (
		<div
			className={`users-container ${
				numberOfUsers > 11 ? "scroll" : null
			}`}
		>
			{users
				.filter((user) => user.userId !== currentUser.userId)
				.map((user) => {
					return <User user={user} key={user.userId} />;
				})}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		chatUser: state.chatUser.chatUser,
	};
};

export default connect(mapStateToProps)(UsersContainer);
