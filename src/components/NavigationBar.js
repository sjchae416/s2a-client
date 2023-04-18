import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import { createApp } from '../api/appApi';
import { updateUser } from '../api/userApi';

export default function NavigationBar({
	googleUser,
	user,
	setUser,
	apps,
	setApps,
	app,
}) {
	const loggedInUser = googleUser;
	const [appsToSave, setAppsToSave] = useState();
	const [showMenu, setShowMenu] = useState(false);

	let navigate = useNavigate();

	const saveApp = async (app) => {
		try {
			const newApp = await createApp(app);
			if (newApp) {
				setApps([...apps, newApp._id]);
			}
		} catch (error) {
			console.error('Error while creating the App', error);
		}
	};

	const updateUserInfo = async (id, update) => {
		try {
			const updatedUser = await updateUser(id, update);
			setUser(updatedUser);
		} catch (error) {}
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

	useEffect(() => {
		setAppsToSave(apps);
	}, []);

	return (
		<div className="card text-right card_one">
			<h3 id="save-change">S2A</h3>
			<span className=" ml-auto">
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
