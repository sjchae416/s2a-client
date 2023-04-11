import React, { useEffect, useState } from "react";
import {Modal, Button} from "react-modal";

import test from "../testData/test2.json";

export default function ConfigTable({columns}){
    //pass in table data from table instead of JSON
    const keys = Object.values(columns);
    const dummyRef = ["test1", "test2"];
    const [config, setConfig] = useState([]);

    const handleInputChange = (event, key, field) => {
        const { value } = event.target;
        setConfig((prevConfig) => {
          const updatedConfig = [...prevConfig];
          const configIndex = updatedConfig.findIndex((item) => item.key === key);
          if (configIndex !== -1) {
            // If config already exists, update the field value
            updatedConfig[configIndex][field] = value;
          } else {
            // If config does not exist, create a new config object
            const newConfig = {
              name: "",
              key: "",
              label: "",
              reference: "",
              type: ""
            };
            newConfig.name = key;
            if (field === "label" || field === "key") {
                newConfig[field] = value === "true";
            } else {
            newConfig[field] = value;
            }
            updatedConfig.push(newConfig);
          }
          return updatedConfig;
        });
      };

      const handleCreateClick = () => {
        // Use the config array to perform desired action with the configuration
        console.log(config);
      };

    return(
        <div>
            <table className="table table-bordered">
            <thead>
                <tr>
                <th>Name</th>
                <th>Key</th>
                <th>Label</th>
                <th>Reference</th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {keys.map((key) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>
                    <label>
                        <input
                        type="radio"
                        name={`radio-col1`}
                        value={key}
                        onChange={(event) => handleInputChange(event, key, "key")}
                        />
                    </label>
                    </td>
                    <td>
                    <label>
                        <input
                        type="radio"
                        name={`radio-col2`}
                        value={key}
                        onChange={(event) => handleInputChange(event, key, "label")}
                        />
                    </label>
                    </td>
                    <td>
                    <select
                        name={`select-${key}`}
                        onChange={(event) => handleInputChange(event, key, "reference")}
                    >
                        <option></option>
                        {dummyRef.map((ref) => (
                        <option key={ref} value={ref}>
                            {ref}
                        </option>
                        ))}
                    </select>
                    </td>
                    <td>
                    <select
                        name={`select-${key}`}
                        onChange={(event) => handleInputChange(event, key, "type")}
                    >
                        <option></option>
                        <option value="int">Number</option>
                        <option value="bool">Boolean</option>
                        <option value="string">Text</option>
                        <option value="url">URL</option>
                    </select>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="text-right">
                <button onClick={handleCreateClick} className="btn btn-danger can_btn">Cancel</button>
            <button onClick={handleCreateClick} className="btn btn-info">Create</button>
            </div>
            
        </div>
    );
}