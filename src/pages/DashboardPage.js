import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardApp } from '../components';
import apps from '../testData/test-apps.json';
import { fetchTokenAPI } from '../api/authApi';

export const name = '';

export default function DashboardPage({ googleUser, user, setUser }) {
	const navigate = useNavigate();

	const [section, setSection] = useState('all');
	const [showMenu, setShowMenu] = useState(false);
	const [token, setToken] = useState('');

	// FIXME need a filter logic for 3 kinds
	const publishedApps = apps.filter((app) => app.status === 'published');
	const inDevelopmentApps = apps.filter((app) => app.inDevelopment);
	const runnableApps = apps.filter((app) => app.runnable);

	// REVIEW if we keep with User.accessToken, this function is no longer needed
	const fetchToken = async () => {
		try {
			const token = await fetchTokenAPI();
			setToken(token);
		} catch (error) {
			console.error('Error fetching the access token', error);
		}
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const response = await fetch(
					'http://localhost:3333/auth/authenticated',
					{
						credentials: 'include',
					}
				);
				if (response.ok) {
					const data = await response.json();
					setUser(data);
					// setUserUser(data);

					if (!data) {
						navigate('/login');
					}
				} else {
					console.error('Error fetching current user: ', response.status);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchCurrentUser();
	}, [navigate]);

	if (!user) {
		return <h1>Processing Authentication Please Wait ...</h1>;
	}

	return (
		<div>
			<br />
			<br />
			<div className="container">
				{/* FIXME REPLACE WITH NAVIGATIONVAR COMPONENT! */}
				<div className="card card_one">
					<Link to="/">
						<h3>{user.email}'s S2A</h3>
					</Link>
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
