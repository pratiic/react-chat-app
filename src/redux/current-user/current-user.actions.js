import { currentUserActionTypes } from "./current-user.types";

export const setCurrentUser = (currentUser) => {
	return {
		type: currentUserActionTypes.SET_CURRENT_USER,
		payload: currentUser,
	};
};
