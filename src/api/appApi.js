const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createApp = async (app) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/`, {
			method: 'POST',
			headers: defaultHeader,
			body: JSON.stringify(app),
		});
		const data = await response.json();

		if (response.ok) {
			const newApp = data;
			return newApp;
		} else {
			const errorMessage = data.message;
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error('Error creating app:', error);
		throw error;
	}
};

export const getAllApps = async () => {
	try {
		const response = await fetch(`http://localhost:3333/apps/`);
		return response.json();
	} catch (error) {
		console.error('Error fetching all apps:', error);
	}
};

export const getAppById = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/${id}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching app by id:', error);
	}
};

export const updateApp = async (id, update) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/${id}`, {
			method: 'PUT',
			headers: defaultHeader,
			body: JSON.stringify(update),
		});
		return response.json();
	} catch (error) {
		console.error('Error updating app:', error);
	}
};

export const deleteApp = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/${id}`, {
			method: 'DELETE',
		});
		return response.status === 204;
	} catch (error) {
		console.error('Error deleting app:', error);
	}
};
