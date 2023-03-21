import { useContext, useState } from "react";
import Modal from "react-modal";

import Box from "@mui/material/Box";

export default function SheetBanner() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
      setModalIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalIsOpen(false);
    };

    const handleSaveModal = () => {
        setModalIsOpen(false);
      };
  return (
  <Box>
    <div>
        <div style={{padding: '50px', display: 'inline-block'}}>
            App Name
        </div>
        <button style={{padding: '50px', display: 'inline-block'}} onClick={handleOpenModal}>Add Record</button>
        <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
            <h2>Add Record</h2>
            <p>Modal content goes here</p>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleSaveModal}>Save</button>
        </Modal>
    </div>
  </Box>
  );
}
