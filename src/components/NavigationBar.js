import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import { createApp, getAppById, updateApp } from '../api/appApi';
import { updateUser } from '../api/userApi';

export default function NavigationBar({ googleUser }) {
	const loggedInUser = googleUser;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	let navigate = useNavigate();

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

	return (
		<div className="card text-right card_one">
			<h3 id="save-change">S2A</h3>
			<span className=" ml-auto">
				<button className="btn btn-info"> {'<'} </button>&nbsp;
				<span className=" ml-auto" />
				<button className="btn btn-info"> {'>'} </button>&nbsp;
				<span className=" ml-auto" />
				{/*<button className="btn btn-info" onClick={handleSaveClick}>
					Save
	            </button>
				<Modal isOpen={isModalOpen}>
					<h2>Confirm Save</h2>
					<p>Are you sure you want to save?</p>
					<button onClick={handleCancelClick}>Cancel</button>
					<button onClick={handleConfirmClick}>Confirm</button>
				</Modal>*/}
				<span className="profile-letter ml-auto" onClick={toggleMenu}>
					{/* REVIEW changed condition logic and fixed warning */}
					{loggedInUser ? loggedInUser?.name?.charAt(0).toUpperCase() : '!'}
					{/* {loggedInUser.name && loggedInUser.name.charAt(0).toUpperCase()} */}
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
