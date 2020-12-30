import React from "react";

import "./App.scss";

import Header from "./components/header/header";
import Chat from "./components/chat/chat";

const App = () => {
	return (
		<div className="app">
			<Header />
			<Chat />
		</div>
	);
};

export default React.memo(App);
