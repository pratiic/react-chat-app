import React from "react";

import "./header.scss";

const Header = () => {
	return (
		<div className="header">
			<div className="wrapper">
				<h1 className="title capitalize">react chat</h1>
			</div>
		</div>
	);
};

export default React.memo(Header);
