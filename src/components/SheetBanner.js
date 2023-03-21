import { useContext, useState } from "react";
import Modal from "react-modal";
import test from './test.json';

import Box from "@mui/material/Box";

const initialValues = Object.fromEntries(
  Object.keys(test[0]).map(key => [key, ''])
);

export default function SheetBanner() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);


    const handleOpenModal = () => {
      setModalIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalIsOpen(false);
    };
  
    const handleSaveModal = () => {
      const newRecord = { ...formValues };
      test.push(newRecord);
      setFormValues(initialValues);
      setModalIsOpen(false);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };

  return (
  <Box>
     <div>
      <div>
        <div style={{ padding: '50px', display: 'inline-block' }}>
          App Name
        </div>
        <button className="btn btn-info" style={{ padding: '50px', display: 'inline-block' }} onClick={handleOpenModal}>Add Record</button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h2>Add Record</h2>
        <form>
          {Object.keys(initialValues).map(key => (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input type="text" id={key} name={key} value={formValues[key]} onChange={handleInputChange} />
            </div>
          ))}
        </form>
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleSaveModal}>Save</button>
      </Modal>
    </div>
  </Box>
  );
}
