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

export const setMid = (mid) => {
	return {
		type: messageControlTypes.SET_MID,
		payload: mid,
	};
};

export const setParentDoc = (parentDoc) => {
	return {
		type: messageControlTypes.SET_PARENT_DOC,
		payload: parentDoc,
	};
};
