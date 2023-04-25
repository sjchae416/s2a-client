const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createUserAPI = async (email) => {
	try {
		const response = await fetch(`http://localhost:3333/users/`, {
			method: 'POST',
			headers: defaultHeader,
			body: JSON.stringify({ email }),
		});
		return response.json();
	} catch (error) {
		console.error('Error creating user:', error);
	}
};

export const getAllUsersAPI = async () => {
	try {
		const response = await fetch(`http://localhost:3333/users/`);
		return response.json();
	} catch (error) {
		console.error('Error fetching all users:', error);
	}
};

export const getUserByEmailAPI = async (email) => {
	try {
		const response = await fetch(`http://localhost:3333/users/${email}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching user by email:', error);
	}
};

export const updateUserAPI = async (id, update) => {
	try {
		const response = await fetch(`http://localhost:3333/users/${id}`, {
			method: 'PUT',
			headers: defaultHeader,
			body: JSON.stringify(update),
		});
		return response.json();
	} catch (error) {
		console.error('Error updating user:', error);
	}
};

export const deleteUserAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/users/${id}`, {
			method: 'DELETE',
		});
		return response.status === 204;
	} catch (error) {
		console.error('Error deleting user:', error);
	}
};
