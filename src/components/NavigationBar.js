import React, { useEffect, useState } from "react";
import {Modal, Button} from "react-modal";

export default function CreateApp(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSaveClick = () => {
      setIsModalOpen(true);
    };
  
    const handleConfirmClick = () => {
      // TODO: handle the confirmation
      setIsModalOpen(false);
    };
  
    const handleCancelClick = () => {
      setIsModalOpen(false);
    };

    return(
      <div class="card text-right card_one">
        <h3 id="save-change">S2A</h3>
        <span class=" ml-auto">
          <button class="btn btn-info"> {"<"} </button>&nbsp;
          <span class=" ml-auto" />
          <button class="btn btn-info"> {">"} </button>&nbsp;
          <span class=" ml-auto" />
          <button class="btn btn-info" onClick={handleSaveClick}>Save</button>
          {/* <Modal isOpen={isModalOpen}>
            <h2>Confirm Save</h2>
            <p>Are you sure you want to save?</p>
            <button onClick={handleConfirmClick}>Confirm</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </Modal> */}
          <a class="profile-letter" href="profile.html">
            P
          </a>
        </span>
      </div>
    );
}