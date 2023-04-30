const defaultHeader = {
  "Content-Type": "application/json",
};

export const getFirstSheetNameAPI = async (sheetData) => {
  try {
    const response = await fetch(
      "http://localhost:3333/googleapis/getmetadata",
      {
        method: "POST",
        credentials: "include",
        headers: defaultHeader,
        body: JSON.stringify(sheetData),
      }
    );
    const data = await response.json();
    return data.sheets[0].properties.title;
  } catch (error) {
    // console.error(error);
  }
};

export const loadSheetAPI = async (sheetData) => {
  try {
    const response = await fetch("http://localhost:3333/googleapis/loadsheet", {
      method: "POST",
      credentials: "include",
      headers: defaultHeader,
      body: JSON.stringify(sheetData),
    });
    const responseBody = await response.text();
    const parsedData = JSON.parse(responseBody);
    return parsedData;
  } catch (error) {
    // console.error(error);
  }
};

export const updateSheetAPI = async (sheetData) => {
  try {
    const response = await fetch(
      "http://localhost:3333/googleapis/updatesheet",
      {
        method: "POST",
        credentials: "include",
        headers: defaultHeader,
        body: JSON.stringify(sheetData),
      }
    );
    const responseBody = await response.text();
    const parsedData = JSON.parse(responseBody);
    return parsedData;
  } catch (error) {
    // console.error(error);
  }
};

export const addRowAPI = async (sheetData) => {
  try {
    const response = await fetch(
      "http://localhost:3333/googleapis/addrow",
      {
        method: "POST",
        credentials: "include",
        headers: defaultHeader,
        body: JSON.stringify(sheetData),
      }
    );
    const responseBody = await response.text();
    const parsedData = JSON.parse(responseBody);
    return parsedData;
  } catch (error) {
    console.error(error);
  }
};
