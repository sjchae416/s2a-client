const defaultHeader = {
	'Content-Type': 'application/json',
};

export const loadSheetAPI = async (tableData) => {
	try {
		const response = await fetch('http://localhost:3333/googleapis/loadtable', {
			method: 'POST',
			credentials: 'include',
			headers: defaultHeader,
			body: JSON.stringify(tableData),
		});
		const responseBody = await response.text();
		const parsedData = JSON.parse(responseBody);
		return parsedData;
	} catch (error) {
		// console.error(error);
	}
};