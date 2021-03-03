import React from "react";

import "./menu-item.scss";

const MenuItem = ({ text, clickHandler }) => {
	return (
		<div className="menu-item" onClick={clickHandler}>
			{text}
		</div>
	);
};

export default MenuItem;
