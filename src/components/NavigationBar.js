import React, { useEffect, useState } from "react";
import Modal from "react-modal";
 import { Link, useNavigate } from 'react-router-dom';

export default function NavigationBar({user}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const loggedInUser = user;
    const handleSaveClick = () => {
      setIsModalOpen(true);
    };

    let navigate = useNavigate();

   const handleConfirmClick = () => {
     // TODO: handle the confirmation
     navigate('/');
     setIsModalOpen(false);
   };

   const handleCancelClick = () => {
     setIsModalOpen(false);
   };


   const logOut = () => {
     window.open(
       `http://localhost:3333/auth/logout`,
       // `http://localhost:${process.env.SERVER_PORT}/auth/logout`,
       '_self'
     );
   };

   const toggleMenu = () => {
     setShowMenu(!showMenu);
   };

    return(
      <div className="card text-right card_one">
       <h3 id="save-change">S2A</h3>
       <span className=" ml-auto">
         <button className="btn btn-info"> {"<"} </button>&nbsp;
         <span className=" ml-auto" />
         <button className="btn btn-info"> {">"} </button>&nbsp;
         <span className=" ml-auto" />
         <button className="btn btn-info" onClick={handleSaveClick}>Save</button>
         <Modal isOpen={isModalOpen}>
           <h2>Confirm Save</h2>
           <p>Are you sure you want to save?</p>
           <button onClick={handleCancelClick}>Cancel</button>
           <button onClick={handleConfirmClick}>Confirm</button>
         </Modal>
         <span className="profile-letter ml-auto" onClick={toggleMenu}>
           {loggedInUser.name && loggedInUser.name.charAt(0).toUpperCase()}
         </span>
         {showMenu && (
           <div className="dropdown-menu">
             <button className="btn-logout-dropdown" onClick={logOut}>
               Logout
             </button>
           </div>
         )}
       </span>
     </div>
    );
}