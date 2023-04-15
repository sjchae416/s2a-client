const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createUser = async (email) => {
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

export const getAllUsers = async () => {
	try {
		const response = await fetch(`http://localhost:3333/users/`);
		return response.json();
	} catch (error) {
		console.error('Error fetching all users:', error);
	}
};

export const getUserByEmail = async (email) => {
	try {
		const response = await fetch(`http://localhost:3333/users/${email}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching user by email:', error);
	}
};

export const updateUser = async (id, update) => {
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

export const deleteUser = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/users/${id}`, {
			method: 'DELETE',
		});
		return response.status === 204;
	} catch (error) {
		console.error('Error deleting user:', error);
	}
};
