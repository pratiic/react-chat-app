import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";

import { setCurrentUser } from "./redux/current-user/current-user.actions";

import { auth } from "./firebase/firebase.utils";

import Header from "./components/header/header";
import Chat from "./components/chat/chat";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";

const App = ({ currentUser, setCurrentUser }) => {
	useEffect(() => {
		auth.signOut();

		const unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
		});

		return () => {
			unSubscribeFromAuth();
		};
		//eslint-disable-next-line
	}, []);

	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path="/" exact>
						<Redirect to="/signin"></Redirect>
					</Route>
					<Route path="/signin">
						{currentUser ? <Redirect to="/chat" /> : <SignIn />}
					</Route>
					<Route path="/signup">
						{currentUser ? <Redirect to="/chat" /> : <SignUp />}
					</Route>
					<Route path="/chat">
						{currentUser ? <Chat /> : <Redirect to="/signin" />}
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUser: (currentUser) => {
			dispatch(setCurrentUser(currentUser));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
