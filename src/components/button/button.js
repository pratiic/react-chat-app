import React from "react";

import "./button.scss";

const Button = ({ children, type, google, buttonClickHandler }) => {
	const buttonClassName = google ? `generic-button google` : `generic-button`;

	return (
		<button
			className={buttonClassName}
			type={type}
			onClick={buttonClickHandler}
		>
			{children}
		</button>
	);
};

export default Button;
