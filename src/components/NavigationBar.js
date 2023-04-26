import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar({ user, isDashboard }) {
  const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3333/auth/logout";
  };

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#save-change");
    const create_app_modal = document.querySelector("#create-app-modals");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modal"
    );
    const create_app_btn = document.querySelector("#create-app-btn");

    if (create_app_modal_btn) {
      create_app_modal_btn.onclick = () => {
        create_app_modal.style.display = "block";
      };
    }

    window.onclick = (event) => {
      if (event.target === create_app_modal) {
        create_app_modal.style.display = "none";
      }
    };

    dismiss_create_app_modal.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
    create_app_btn.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
  }, []);

  return (
    <div className="card text-right card_one">
      {isDashboard ? <h3>S2A</h3> : <h3 id="save-change">S2A</h3>}
      <span className=" ml-auto">
        {/* Here are the Undo-Redo and Save buttons
				<button className="btn btn-info"> {'<'} </button>&nbsp;
				<span className=" ml-auto" />
				<button className="btn btn-info"> {'>'} </button>&nbsp;
				<span className=" ml-auto" />

				<button className="btn btn-info" onClick={handleSaveClick}>
					Save
	            </button>
				<Modal isOpen={isModalOpen}>
					<h2>Confirm Save</h2>
					<p>Are you sure you want to save?</p>
					<button onClick={handleCancelClick}>Cancel</button>
					<button onClick={handleConfirmClick}>Confirm</button>
				</Modal>
				*/}
        <span className="profile-letter ml-auto" onClick={toggleMenu}>
          {user.email && user.email.charAt(0).toUpperCase()}
        </span>
        {showMenu && (
          <div className="dropdown-menu">
            <button className="btn-logout-dropdown" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </span>

      <div className="modal" id="create-app-modals">
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="card">
              <div className="form-group save_ur_chnage">
                <h5>Save Changes</h5>
                <h5>Would you like to save your changes before proceeding?</h5>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-danger "
                  id="dismiss_create_app_modal"
                >
                  Discard
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-success"
                  id="create-app-btns"
                >
                  Save
                </button>
                <button className="btn btn-danger" id="create-app-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
