const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createTableAPI = async (tableData) => {
	try {
		const response = await fetch('http://localhost:3333/tables/', {
			method: 'POST',
			credentials: 'include',
			headers: defaultHeader,
			body: JSON.stringify(tableData),
		});
		return response.json();
		// REVIEW below is how I only return the non null response, else an error
		// const data = await response.json();

		// if (response.ok) {
		// 	const newApp = data;
		// 	return newApp;
		// } else {
		// 	const errorMessage = data.message;
		// 	throw new Error(errorMessage);
		// }
	} catch (error) {
		console.error(error);
	}
};

export const readAllTablesAPI = async () => {
	try {
		const response = await fetch('http://localhost:3333/tables/', {
			method: 'GET',
			credentials: 'include',
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const readTableAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const updateTableAPI = async (id, update) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: defaultHeader,
			body: JSON.stringify(update),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const deleteTableAPI = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: defaultHeader,
		});

		if (response.ok) {
			return response.status === 204;
		} else {
			return new Error(response.statusText);
		}
	} catch (error) {
		console.error(error);
	}
};
