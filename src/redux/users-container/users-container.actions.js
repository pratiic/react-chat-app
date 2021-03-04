import { usersContainerActionTypes } from "./users-container.types";

export const toggleUsersContainer = (display) => {
	return {
		type: usersContainerActionTypes.TOGGLE_USERS_CONTAINER,
		payload: display,
	};
};
