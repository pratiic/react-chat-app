import React from "react";

import "./input-field.scss";

const InputField = ({
	type,
	label,
	value,
	name,
	error,
	reference,
	handleInputChange,
}) => {
	const inputClassName = error ? "error" : null;

	return (
		<div className="input-field">
			<label>{label}</label>
			<input
				className={inputClassName}
				type={type}
				value={value}
				name={name}
				ref={reference}
				onChange={handleInputChange}
			/>
			{error ? <p>{error}</p> : null}
		</div>
	);
};

export default InputField;
