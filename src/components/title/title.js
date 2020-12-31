import React from "react";

import "./title.scss";

const Title = (props) => {
	const className = props.smaller ? `smaller` : null;

	return <p className={className}>{props.children}</p>;
};

export default Title;
