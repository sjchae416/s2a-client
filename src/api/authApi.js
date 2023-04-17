const defaultHeader = {
	'Content-Type': 'application/json',
};

export const fetchTokenAPI = async () => {
	try {
		const response = await fetch(`http://localhost:3333/auth/token`, {
			method: 'GET',
			headers: defaultHeader,
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			const accessToken = data.accessToken;
			return accessToken;
		} else {
			console.error('Failed to fetch access token');
		}
	} catch (error) {
		console.error('Error fetching access token', error);
	}
};
