import React from "react";

import "./message.scss";

const Message = ({ text, self }) => {
	const className = self ? `message self` : `message`;

	return <div className={className}>{text}</div>;
};

export default Message;
