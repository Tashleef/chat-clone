let users = [];

const findUser = (option) => {
	const user = users.find((user) => {
		return Object.entries(option).every(
			([key, value]) => user.hasOwnProperty(key) && user[key] === value
		);
	});
	return user;
};

const addUser = (user) => {
	let exist = findUser(user);
	if (!exist) {
		users.push(user);
	}
};

const getAllUsers = (option) => {
	let result = users.filter((user) => {
		return Object.entries(option).every(
			([key, value]) => user.hasOwnProperty(key) && user[key] === value
		);
	});
	return result;
};

const deleteUser = (myUser) => {
	const user = findUser(myUser);
	const { id } = myUser;
	users = users.filter((user) => {
		return user.id !== id;
	});

	return user;
};

module.exports = {
	getAllUsers,
	addUser,
	deleteUser,
	findUser,
};
