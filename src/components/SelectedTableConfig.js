import React from "react";

// using this to print out the config of the selected tble
const SelectedTableConfig = ({ keys, userTables, handleInputChangesss }) => {
  return (
    <>
      {keys.map((key) => (
        <tr key={key._id}>
          <td>{key.name}</td>
          <td>
            <label>
              <input
                type="radio"
                name={`radio-col1`}
                defaultChecked={key.key}
                value={key._id}
                onChange={(event) => handleInputChangesss(event, key, "key")}
              />
            </label>
          </td>
          <td>
            <label>
              <input
                type="radio"
                name={`radio-col2`}
                defaultChecked={key.label}
                value={key._id}
                onChange={(event) => handleInputChangesss(event, key, "label")}
              />
            </label>
          </td>
          <td>
            <select
              name={key._id}
              onChange={(event) =>
                handleInputChangesss(event, key, "reference")
              }
            >
              <option>None</option>
              {userTables?.map((table) => (
                <option
                  key={table._id}
                  value={table.name}
                  selected={key.reference === table.name ? true : false}
                >
                  {table.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select
              name={key._id}
              onChange={(event) => handleInputChangesss(event, key, "type")}
            >
              {[
                { type: "string", name: "Text" },
                { type: "int", name: "Number" },
                { type: "bool", name: "Boolean" },
                { type: "url", name: "URL" },
              ].map((item) => (
                <option
                  key={item.type}
                  value={item.type}
                  selected={key.type === item.type ? true : false}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SelectedTableConfig;
