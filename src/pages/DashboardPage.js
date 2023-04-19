import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardApp from '../components/DashboardApp';
import apps from '../testData/test-apps.json';
import { fetchTokenAPI } from '../api/authApi';
import { createUser, getUserByEmail } from '../api/userApi';

export const name = '';

export default function DashboardPage({ googleUser, setUser }) {
	const [isLoading, setIsLoading] = useState(true);
	const [section, setSection] = useState('all');
	const [showMenu, setShowMenu] = useState(false);
	const [token, setToken] = useState('');

	const loggedInUser = googleUser;

	const publishedApps = apps.filter((app) => app.status === 'published');
	const inDevelopmentApps = apps.filter((app) => app.inDevelopment);
	const runnableApps = apps.filter((app) => app.runnable);

	const fetchToken = async () => {
		try {
			const token = await fetchTokenAPI();
			setToken(token);
		} catch (error) {
			console.error('Error fetching the access token', error);
		}
	};

	const loadUser = async (email) => {
		try {
			const user = await getUserByEmail(email);

			if (user) {
				console.log('IF');
				setUser(user);
			} else {
				console.log('ELSE');
				try {
					// REVIEW gets called more than once (2 or 3) so first create properly then next 2 cause duplicate email error
					const newUser = await createUser(email);

					setUser(newUser);
				} catch (error) {
					console.error('Error creating a new User', error);
				}
			}
		} catch (error) {
			console.error('Error getting the User', error);
		}
	};

	const logOut = () => {
		window.open(
			// FIXME do not reveal SERVER_PORT
			`http://localhost:3333/auth/logout`,
			// `http://localhost:${process.env.SERVER_PORT}/auth/logout`,
			'_self'
		);
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		fetchToken();
		loadUser(loggedInUser.email);
	}, [loggedInUser]);

	return (
		<div>
			<br />
			<br />
			<div className="container">
				{/* FIXME WHY NOT REUSE COMPONENT?! */}
				<div className="card card_one">
					<Link to="/">
						<h3>S2A</h3>
					</Link>
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
				</div>

				<br />

				<div className="card">
					<div className="box_one">
						<div className="box_three">
							<div className="row">
								<div className="col-auto">
									<Link to="/manage-app">
										<button className="btn btn-info">Manage App</button>
									</Link>
									<br />
									<Link to="/add-table">
										<button className="btn btn-info create_table_btn">
											Add Table
										</button>
									</Link>
									<ul className="app_list">
										<li
											className={section === 'all' ? 'active' : ''}
											onClick={() => setSection('all')}
										>
											All Apps
										</li>
										<li
											className={section === 'publish' ? 'active' : ''}
											onClick={() => setSection('publish')}
										>
											Published Apps
										</li>
										<li
											className={section === 'indevelopment' ? 'active' : ''}
											onClick={() => setSection('indevelopment')}
										>
											In Development Apps
										</li>
										<li
											className={section === 'runnable' ? 'active' : ''}
											onClick={() => setSection('runnable')}
										>
											Runnable Apps
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="box_two">
							{section === 'all' ? (
								<ul>
									<p>All Apps</p>
									<div className="row">
										{apps.map((app) => (
											<DashboardApp
												key={app.name}
												name={app.name}
												date={app.date}
											/>
										))}
									</div>
								</ul>
							) : section === 'publish' ? (
								<ul>
									<p>Published Apps</p>
									<div className="row">
										{publishedApps.map((app) => (
											<DashboardApp
												key={app.name}
												name={app.name}
												date={app.date}
											/>
										))}
									</div>
								</ul>
							) : section === 'indevelopment' ? (
								<ul>
									<p>In Development Apps</p>
									<div className="row">
										{inDevelopmentApps.map((app) => (
											<DashboardApp
												key={app.name}
												name={app.name}
												date={app.date}
											/>
										))}
									</div>
								</ul>
							) : section === 'runnable' ? (
								<ul>
									<p>Runnable Apps</p>
									<div className="row">
										{runnableApps.map((app) => (
											<DashboardApp
												key={app.name}
												name={app.name}
												date={app.date}
											/>
										))}
									</div>
								</ul>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
