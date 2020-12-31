import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

import ProfilePreview from "../profile-preview/profile-preview";

const Header = () => {
	return (
		<div className="header">
			<div className="wrapper">
				<Link to="/chat">
					<h1 className="title capitalize">react chat</h1>
				</Link>
				<ProfilePreview />
			</div>
		</div>
	);
};

export default React.memo(Header);
