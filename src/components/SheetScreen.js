import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Modal from "react-modal";

import test from './test.json';

export default function SheetScreen() {

  //  const test =  [
  //       {
  //         "name": "John Smith",
  //         "id": "12345",
  //         "email": "john.smith@example.com",
  //         "assignment": "Homework 1",
  //         "grade": "A",
  //       },
  //       {
  //         "name": "Jane Doe",
  //         "id": "67890",
  //         "email": "jane.doe@example.com",
  //         "assignment": "Homework 1",
  //         "grade": "B+",
  //       },
  //       {
  //         "name": "Bob Johnson",
  //         "id": "24680",
  //         "email": "bob.johnson@example.com",
  //         "assignment": "Quiz 1",
  //         "grade": "C-",
  //       }
  //     ]

  // state to store the row data for editing
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editData, setEditData] = useState({});

  const handleRowClick = (rowData) => {
    setRowData(rowData);
    setEditData(rowData);
    setModalIsOpen(true);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = test.map((item) => {
      if (item.id === editData.id) {
        return editData;
      }
      return item;
    });
    setRowData(newData);
    setModalIsOpen(false);
  }

      
  return (
    <Box>
      <br/><br/>
      <table>
        <thead>
          <tr>
            {Object.keys(test[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {test.map((rowData) => (
            <tr key={rowData.id} onClick={() => handleRowClick(rowData)}>
              {Object.values(rowData).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <h2>Edit Row Data</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(rowData).map(([key, value]) => (
            <div key={key}>
              <label>{key}: </label>
              <input
                type="text"
                name={key}
                value={editData[key] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </Box>
    );
}
