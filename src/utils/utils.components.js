export const getProfileLetter = (currentUser) => {
	if (currentUser) {
		if (currentUser.displayName) {
			return currentUser.displayName[0];
		} else if (currentUser.username) {
			return currentUser.username[0];
		} else {
			return currentUser.email[0];
		}
	} else {
		return null;
	}
};

export const getProfilePicture = (currentUser) => {
	if (currentUser) {
		return currentUser.photoURL ? currentUser.photoURL : null;
	} else {
		return null;
	}
};
