import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "react-modal";

import test from "../testData/test.json";

const initialValues = Object.fromEntries(
  Object.keys(test[0]).map((key) => [key, ""])
);

export default function TableView() {
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
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editData, setEditData] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);

  const handleRowClick = (rowData) => {
    setRowData(rowData);
    setEditData(rowData);
    setEditModalIsOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = test.map((item) => {
      if (item.id === editData.id) {
        return editData;
      }
      return item;
    });
    setRowData(newData);
    setEditModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setAddModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalIsOpen(false);
  };

  const handleSaveModal = () => {
    const newRecord = { ...formValues };
    test.push(newRecord);
    setFormValues(initialValues);
    setAddModalIsOpen(false);
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  let AddRecordModal = (
    <Modal isOpen={addModalIsOpen} onRequestClose={handleCloseModal}>
      <h2>Add Record</h2>
      <form>
        {Object.keys(initialValues).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formValues[key]}
              onChange={handleAddInputChange}
            />
          </div>
        ))}
      </form>
      <button onClick={handleCloseModal}>Cancel</button>
      <button onClick={handleSaveModal}>Save</button>
    </Modal>
  );

  const handleEditClose = () => {
    setEditModalIsOpen(false);
    setIsEditing(false);
  };

  // adds the info edited into json
  const handleEditSubmit = () => {
    setEditModalIsOpen(false);
    setIsEditing(false);
  };

  let EditRecordModal = (
    <Modal
      isOpen={editModalIsOpen}
      onRequestClose={() => setEditModalIsOpen(false)}
      ariaHideApp={false}
    >
      <h2>{isEditing ? "Edit Row Data" : "Detail View"}</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {Object.entries(rowData).map(([key, value]) => (
            <div key={key}>
              <label>
                {key}
                <input
                  type="text"
                  name={key}
                  value={editData[key] || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          ))}
          <button onClick={handleEditClose}>Cancel</button>
          <button onClick={handleEditSubmit} type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {Object.entries(rowData).map(([key, value]) => (
            <div key={key}>
              <label>
                {key}:&nbsp;&nbsp;
                <span>{value}</span>
              </label>
            </div>
          ))}
          <button onClick={handleEditClose}>Close</button>
        </>
      )}
    </Modal>
  );

  return (
    <Box>
      <div>
        <div>
          <div style={{ padding: "50px", display: "inline-block" }}>
            App Name
          </div>
          <button
            className="btn btn-info"
            style={{ padding: "50px", display: "inline-block" }}
            onClick={handleOpenModal}
          >
            Add Record
          </button>
        </div>
        {AddRecordModal}
      </div>
      <br />
      <br />
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
      {EditRecordModal}
    </Box>
  );
}
