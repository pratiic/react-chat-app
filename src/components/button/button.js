import React from "react";

import "./button.scss";

const Button = ({ children, type }) => {
	return (
		<button className="generic-button" type={type}>
			{children}
		</button>
	);
};

export default Button;
