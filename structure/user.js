let users = [];
const addUser = ({ username }) => {
	if (
		users.findIndex(() => {
			return { username };
		}) === -1
	)
		users.push({ username });
};

const getAllUsers = () => {
	return users;
};

module.exports = {
	getAllUsers,
	addUser,
};
