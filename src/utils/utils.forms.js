export const checkEmpty = (fields) => {
	let emptyFieldNames = [];

	fields.forEach((field) => {
		if (field.value === "") {
			emptyFieldNames = [...emptyFieldNames, field.fieldName];
		}
	});

	return emptyFieldNames;
};

export const validateEmail = (email) => {
	const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegExp.test(email.toLowerCase());
};

export const checkMatch = (firstValue, secondValue) => {
	return firstValue === secondValue;
};
