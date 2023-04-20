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
				<button className="btn btn-info"> {'<'} </button>&nbsp;
				<span className=" ml-auto" />
				<button className="btn btn-info"> {'>'} </button>&nbsp;
				<span className=" ml-auto" />
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
