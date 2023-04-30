import React from "react";

// using this to print out the config of the selected tble
const SelectedTableConfig = ({ keys, userTables }) => {
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
              />
            </label>
          </td>
          <td>
            <label>
              <input
                type="radio"
                name={`radio-col2`}
                defaultChecked={key.label}
              />
            </label>
          </td>
          <td>
            <select name={`select-${key}`} defaultValue="none">
              <option value="none">None</option>
              {userTables?.map((table) => (
                <option key={table._id} value={table._id}>
                  {table.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select>
              {[
                { type: "Text", name: "Text" },
                { type: "Number", name: "Number" },
                { type: "Boolean", name: "Boolean" },
                { type: "URL", name: "URL" },
              ].map((item) => (
                <option
                  key={item.type}
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
