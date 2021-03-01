import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./users-container.scss";

import { firestore } from "../../firebase/firebase.utils";

import User from "../user/user";

const UsersContainer = ({ currentUser }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
		//eslint-disable-next-line
	}, []);

	const fetchUsers = async () => {
		const usersRef = await firestore.collection("users").get();
		const usersDocs = usersRef.docs.map((doc) => {
			return { ...doc.data(), active: false };
		});
		setUsers(usersDocs);
	};

	return (
		<div className="users-container">
			<div className="users-container-header">users</div>
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
	};
};

export default connect(mapStateToProps)(UsersContainer);