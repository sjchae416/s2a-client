import React, { useState } from 'react';

export default function NavigationBar({ user }) {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className="card text-right card_one">
			<h3 id="save-change">S2A</h3>
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
						<button className="btn-logout-dropdown">
							<a href="http://localhost:3333/auth/logout">Log Out</a>
						</button>
					</div>
				)}
			</span>
		</div>
	);
}
