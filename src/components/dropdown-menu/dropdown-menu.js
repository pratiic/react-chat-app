import React from "react";

import "./dropdown-menu.scss";

const DropdownMenu = ({ children, show }) => {
	const dropdownMenuClassName = show ? `dropdown-menu show` : `dropdown-menu`;

	return <div className={dropdownMenuClassName}>{children}</div>;
};

export default DropdownMenu;
