const defaultHeader = {
	'Content-Type': 'application/json',
};

export const createView = async (viewData) => {
	try {
		const response = await fetch("http://localhost:3333/views/", {
			method: "POST",
			credentials: "include",
			headers: defaultHeader,
			body: JSON.stringify(viewData),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const readAllViews = async () => {
	try {
		const response = await fetch("http://localhost:3333/views/", {
			method: "GET",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const readView = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: "GET",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const updateView = async (id, viewData) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: "PUT",
			credentials: "include",
			headers: defaultHeader,
			body: JSON.stringify(viewData),
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export const deleteView = async (id) => {
	try {
		const response = await fetch(`http://localhost:3333/views/${id}`, {
			method: "DELETE",
			credentials: "include",
			headers: defaultHeader,
		});
		return response.status === 204;
	} catch (error) {
		console.error(error);
	}
}