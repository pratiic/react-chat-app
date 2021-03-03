import { messageControlTypes } from "./message-control.types";

export const setEditing = (editing) => {
	return {
		type: messageControlTypes.SET_EDITING,
		payload: editing,
	};
};

export const setMessageFieldContent = (messageFieldContent) => {
	return {
		type: messageControlTypes.SET_MESSAGE_FIELD_CONTENT,
		payload: messageFieldContent,
	};
};
