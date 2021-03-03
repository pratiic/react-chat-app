import { messageControlTypes } from "./message-control.types";

let INITIAL_STATE = {
	editingMessage: false,
	messageFieldContent: "",
};

export const messageControlReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case messageControlTypes.SET_EDITING:
			return { ...state, editingMessage: action.payload };
		case messageControlTypes.SET_MESSAGE_FIELD_CONTENT:
			return { ...state, messageFieldContent: action.payload };
		default:
			return state;
	}
};
