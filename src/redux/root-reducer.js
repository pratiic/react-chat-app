import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { chatUserReducer } from "./chat-user/chat-user.reducer";
import { messageControlReducer } from "./message-control/message-control.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	chatUser: chatUserReducer,
	messageControl: messageControlReducer,
});
