import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./users-container.scss";

import { firestore } from "../../firebase/firebase.utils";

import User from "../user/user";
import UserSearch from "../user-search/user-search";

const UsersContainer = ({ currentUser, chatUser }) => {
	const [users, setUsers] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);
	const [searchValue, setSearchValue] = useState("");

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

	const searchValueChangeHandler = (searchValue) => {
		setSearchValue(searchValue);
	};

	return (
		<div
			className={`users-container ${
				numberOfUsers > 11 ? "scroll" : null
			}`}
		>
			<div className="users-container-header">
				<UserSearch
					searchValue={searchValue}
					searchValueChangeHandler={searchValueChangeHandler}
				/>
			</div>
			<div className="users-list">
				{users
					.filter((user) => {
						if (user.userId !== currentUser.userId) {
							if (
								user.username
									.toLowerCase()
									.includes(searchValue) ||
								user.email.includes(searchValue)
							) {
								return true;
							}
							return null;
						}

						return null;
					})
					.map((user) => {
						return <User user={user} key={user.userId} />;
					})}
			</div>
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
