const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createAppAPI = async (app) => {
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
		console.error('Error creating app: ', error);
		throw error;
	}
};

export const getAllAppsAPI = async () => {
	try {
		const response = await fetch(`http://localhost:3333/apps/`);
		const data = response.json();
		if (response.ok) {
			return data;
		} else {
			const errorMessage = data.message;
			console.error('Error reading all Apps: ', errorMessage);
			return null;
		}
	} catch (error) {
		console.error('Error fetching all apps:', error);
	}
};

export const getAppByIdAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/${id}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching app by id:', error);
	}
};

export const updateAppAPI = async (id, update) => {
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

export const deleteAppAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/apps/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			return response.status === 204;
		} else {
			return new Error(response.statusText);
		}
	} catch (error) {
		console.error('Error deleting app:', error);
	}
};
