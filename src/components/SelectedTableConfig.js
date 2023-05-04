import React, { useEffect, useState } from "react";

// using this to print out the config of the selected tble
const SelectedTableConfig = ({ keys, userTables, handleUpdateConfig }) => {
  return (
    <>
      {keys.map((key) => (
        <tr key={key._id}>
          <td>{key.name}</td>
          <td>
            <label>
              <input
                type="radio"
                name={`radio-col1${key._id}`}
                checked={key.key}
                value={key._id}
                onChange={(event) => handleUpdateConfig(event, key, "key")}
              />
            </label>
          </td>
          <td>
            <label>
              <input
                type="radio"
                name={`radio-col2${key._id}`}
                checked={key.label}
                value={key._id}
                onChange={(event) => handleUpdateConfig(event, key, "label")}
              />
            </label>
          </td>
          <td>
            <select
              value={key.reference}
              name={key._id}
              onChange={(event) => handleUpdateConfig(event, key, "reference")}
            >
              <option>None</option>
              {userTables?.map((table) => (
                <option key={table._id} value={table._id}>
                  {table.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select
              value={key.type}
              name={key._id}
              onChange={(event) => handleUpdateConfig(event, key, "type")}
            >
              {[
                { type: "string", name: "Text" },
                { type: "int", name: "Number" },
                { type: "bool", name: "Boolean" },
                { type: "url", name: "URL" },
              ].map((item) => (
                <option key={item.type} value={item.type}>
                  {item.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              value={key.initialValue}
              type="text"
              onChange={(event) =>
                handleUpdateConfig(event, key, "initialValue")
              }
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default SelectedTableConfig;
