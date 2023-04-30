const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createViewAPI = async (viewData) => {
	try {
		const response = await fetch('http://localhost:3333/views/', {
			method: 'POST',
			credentials: 'include',
			headers: defaultHeader,
			body: JSON.stringify(viewData),
		});
		const data = await response.json();
		if (response.ok) {
			const newView = data;
			return newView;
		} else {
			const errorMessage = data.message;
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error(error);
	}
};

export const readAllViewsAPI = async () => {
	try {
		const response = await fetch('http://localhost:3333/views/', {
			method: 'GET',
			credentials: 'include',
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const readViewAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: defaultHeader,
		});

		if (response.ok) {
			return response.json();
		} else {
			return new Error(response.json().message);
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateViewAPI = async (id, viewData) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: defaultHeader,
			body: JSON.stringify(viewData),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const deleteViewAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: defaultHeader,
		});
		return response.status === 204;
	} catch (error) {
		console.error(error);
	}
};
