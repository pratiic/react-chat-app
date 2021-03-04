import React, { useRef } from "react";

import "./user-search.scss";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const UserSearch = ({ searchValue, searchValueChangeHandler }) => {
	const inputRef = useRef(null);

	const handleSearchIconClick = () => {
		inputRef.current.focus();
	};

	return (
		<form className="user-search">
			<SearchIcon
				className="icon small"
				onClick={handleSearchIconClick}
			/>
			<input
				type="text"
				className="user-search-input"
				placeholder="search by name or email"
				ref={inputRef}
				value={searchValue}
				onChange={(event) =>
					searchValueChangeHandler(event.target.value)
				}
			/>
		</form>
	);
};

export default UserSearch;
