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
		const responseBody = await response.text(); // Read the response body as text
		// console.log(responseBody ? responseBody : "no response");
		const parsedData = JSON.parse(responseBody);
		return parsedData;
	} catch (error) {
		console.error(error);
	}
}