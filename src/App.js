import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";

import Header from "./components/header/header";
import Chat from "./components/chat/chat";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";

const App = () => {
	return (
		<div className="app">
			<Header />
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/signin"></Redirect>
					</Route>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/chat">
						<Chat />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default React.memo(App);
