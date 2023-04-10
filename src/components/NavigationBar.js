import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

export default function CreateApp(){
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleSaveClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        // Your save logic here
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
    };

    return(
        <div class="card text-right card_one">
          <h3 id="save-change">S2A</h3>
          <span class=" ml-auto">
            <button class="btn btn-info"> {"<"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info"> {">"} </button>&nbsp;
            <span class=" ml-auto" />
            <button className="btn btn-info" onClick={handleSaveClick}>Save</button>&nbsp;
              <Modal show={showConfirmModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirm}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            <a class="profile-letter" href="profile.html">
              P
            </a>
          </span>
        </div>
    );
}