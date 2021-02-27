import React from "react";
import { Link } from "react-router-dom";

import "./sign-in.scss";

import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import { checkEmpty, validateEmail } from "../../utils/utils.forms";

import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";

import Title from "../title/title";
import InputField from "../input-field/input-field";
import Button from "../button/button";

class SignIn extends React.Component {
	constructor() {
		super();

		this.state = {
			email: "",
			emailError: "",
			password: "",
			passwordError: "",
			fieldNames: ["username", "email", "password", "repeatedPassword"],
		};

		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.focusFirstInput();
	}

	focusFirstInput = () => {
		this.inputRef.current.focus();
	};

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();

		const emptyFieldNames = checkEmpty([
			{ value: this.state.email, fieldName: "email" },
			{ value: this.state.password, fieldName: "password" },
		]);

		// const nonEmptyFieldNames = this.state.fieldNames.filter((fieldName) => {
		// 	return emptyFieldNames.indexOf(fieldName) === -1;
		// });

		if (emptyFieldNames.length > 0) {
			emptyFieldNames.forEach((emptyFieldName) => {
				this.setFieldError(
					emptyFieldName,
					"this field cannot be empty"
				);
			});
			//this.clearFieldError(nonEmptyFieldNames);
			return;
		}

		const validEmail = validateEmail(this.state.email);

		if (!validEmail) {
			this.setFieldError("email", "this email is not valid");
			return;
		}

		//this.clearFieldError("email");

		this.clearFieldError(["email", "password"]);

		this.signInWithEmailAndPassword();
	};

	signInWithEmailAndPassword = async () => {
		try {
			await auth.signInWithEmailAndPassword(
				this.state.email,
				this.state.password
			);
		} catch (error) {
			if (error.code === "auth/wrong-password") {
				this.setFieldError("password", "this is an invalid password");
			}
			if (error.code === "auth/user-not-found") {
				this.setFieldError(
					"email",
					"this email is not associated with any user"
				);
			}
		}
	};

	setFieldError = (fieldName, errorMessage) => {
		this.setState({ [`${fieldName}Error`]: errorMessage });
	};

	clearFieldError = (fieldNames) => {
		fieldNames.forEach((fieldName) => {
			this.setState({ [`${fieldName}Error`]: "" });
		});
	};

	buttonClickHandler = () => {
		signInWithGoogle();
	};

	render() {
		return (
			<div className="sign-in form-container">
				<Title>Sign in to react chat</Title>
				<Title smaller>
					Do not have an account? <Link to="/signup">sign up</Link>
				</Title>
				<form className="sign-in-form" onSubmit={this.handleFormSubmit}>
					<InputField
						type="text"
						label="email"
						name="email"
						value={this.state.email}
						error={this.state.emailError}
						reference={this.inputRef}
						handleInputChange={this.handleInputChange}
					/>
					<InputField
						type="password"
						label="password"
						name="password"
						value={this.state.password}
						error={this.state.passwordError}
						handleInputChange={this.handleInputChange}
					/>
					<div className="buttons">
						<Button type="submit">sign in</Button>
						<Button
							secondary
							buttonClickHandler={this.buttonClickHandler}
						>
							<GoogleIcon className="icon" />
							sign in with google
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
