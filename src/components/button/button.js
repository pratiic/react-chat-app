import React from "react";

import "./button.scss";

const Button = ({ children, type, secondary, size, buttonClickHandler }) => {
	const getButtonClass = () => {
		let className = "generic-button";
		if (secondary) {
			className += ` secondary`;
		}
		console.log(className);

		return (className += ` ${size}`);
	};

	return (
		<button
			className={getButtonClass()}
			type={type}
			onClick={buttonClickHandler}
		>
			{children}
		</button>
	);
};

export default Button;
