import React from "react";
import { Link } from "react-router-dom";

import { checkEmpty, validateEmail, checkMatch } from "../../utils/utils.forms";

import Title from "../title/title";
import InputField from "../input-field/input-field";
import Button from "../button/button";

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			username: "",
			usernameError: "",
			email: "",
			emailError: "",
			password: "",
			passwordError: "",
			repeatedPassword: "",
			repeatedPasswordError: "",
			fieldNames: ["username", "email", "password", "repeatedPassword"],
		};
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();

		const emptyFieldNames = checkEmpty([
			{ value: this.state.username, fieldName: "username" },
			{ value: this.state.email, fieldName: "email" },
			{ value: this.state.password, fieldName: "password" },
			{
				value: this.state.repeatedPassword,
				fieldName: "repeatedPassword",
			},
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

		const samePasswords = checkMatch(
			this.state.password,
			this.state.repeatedPassword
		);

		if (!samePasswords) {
			this.setFieldError("password", "these passwords do not match");
			this.setFieldError(
				"repeatedPassword",
				"these passwords do not match"
			);
			return;
		}

		//this.clearFieldError(["password", "repeatedPassword"]);

		const validEmail = validateEmail(this.state.email);

		if (!validEmail) {
			this.setFieldError("email", "this email is not valid");
			return;
		}

		this.clearFieldError([
			"username",
			"email",
			"password",
			"repeatedPassword",
		]);
	};

	setFieldError = (fieldName, errorMessage) => {
		this.setState({ [`${fieldName}Error`]: errorMessage });
	};

	clearFieldError = (fieldNames) => {
		fieldNames.forEach((fieldName) => {
			this.setState({ [`${fieldName}Error`]: "" });
		});
	};

	render() {
		return (
			<div className="sign-up form-container">
				<Title>Sign up to react chat</Title>
				<Title smaller>
					Already have an account? <Link to="/signin">sign in</Link>{" "}
				</Title>
				<form className="sign-in-form" onSubmit={this.handleFormSubmit}>
					<InputField
						type="text"
						label="username"
						name="username"
						value={this.state.username}
						error={this.state.usernameError}
						handleInputChange={this.handleInputChange}
					/>
					<InputField
						type="text"
						label="email"
						name="email"
						value={this.state.email}
						error={this.state.emailError}
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
					<InputField
						type="password"
						label="retype password"
						name="repeatedPassword"
						value={this.state.repeatedPassword}
						error={this.state.repeatedPasswordError}
						handleInputChange={this.handleInputChange}
					/>
					<Button type="submit">sign up</Button>
				</form>
			</div>
		);
	}
}

export default SignUp;
