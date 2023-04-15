const defaultHeader = {
	'Content-Type': 'application/json',
};

export const loadTable = async (tableData) => {
	try {
		const response = await fetch("http://localhost:3333/tables/loadtable", {
			method: "POST",
			credentials: "include",
			headers: defaultHeader,
			body: JSON.stringify(tableData),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const createTable = async (tableData) => {
	try {
		const response = await fetch("http://localhost:3333/tables/", {
			method: "POST",
			credentials: "include",
			headers: defaultHeader,
			body: JSON.stringify(tableData),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const readAllTables = async () => {
	try {
		const response = await fetch("http://localhost:3333/tables/", {
			method: "GET",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const readTable = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: "GET",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const updateTable = async (id, update) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: "PUT",
			credentials: "include",
			headers: defaultHeader,
			body: JSON.stringify(update),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const deleteTable = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/tables/${id}`, {
			method: "DELETE",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.status === 204;
	} catch (error) {
		console.error(error);
	}
}