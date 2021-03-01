import React from "react";

import "./main.scss";

import Chat from "../../components/chat/chat";
import UsersContainer from "../../components/users-container/users-container";

const Main = () => {
	return (
		<div className="main">
			<UsersContainer />
			<Chat />
			<div></div>
		</div>
	);
};

export default Main;
