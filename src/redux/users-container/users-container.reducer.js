import { usersContainerActionTypes } from "./users-container.types";

let INITIAL_STATE = {
	displayInSmallScreens: true,
};

export const usersContainerReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case usersContainerActionTypes.TOGGLE_USERS_CONTAINER:
			return {
				...state,
				displayInSmallScreens:
					action.payload || !state.displayInSmallScreens,
			};
		default:
			return state;
	}
};
