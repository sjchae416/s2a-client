import React, { useEffect, useState } from "react";
import {Modal, Button} from "react-modal";

import test from "../testData/test2.json";

export default function ConfigTable(){

    const keys = Object.keys(test[0]);
    return(
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
                  <input type="radio" name={`radio-col1`} value={key} />
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" name={`radio-col2`} value={key} />
                </label>
              </td>
              <td>
                <select name={`select-${key}`}>
                  <option></option>
                </select>
              </td>
              <td>
                <select name={`select-${key}`}>
                  <option value="int">Number</option>
                  <option value="bool">Boolean</option>
                  <option value="string">Text</option>
                  <option value="string">URL</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}