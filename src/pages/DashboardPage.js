import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DashboardApp, NavigationBar } from '../components';
import UserContext from '../UserContext';

export default function DashboardPage({
	setReloadApp,
	isDeveloper,
	runnableApps,
}) {
	const { user, setUser } = useContext(UserContext);
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const handleManageButton = () => {
		setReloadApp(false);
	};

	if (!user) {
		return (
			<div>
				<h1>Processing Authentication Please Wait ...</h1>;
				<h2>If the browser don't continue to the desired page, please go </h2>;
				<a href="http://localhost:3333/auth/google">
					Click here to log in again
				</a>
			</div>
		);
	}

	return (
		<div>
			<br />
			<br />
			<div className="container">
				<NavigationBar user={user} isDashboard={true} />
				<br />

				<div className="card">
					<div className="box_one">
						<div className="box_three">
							<div className="row">
								<div className="col-auto">
									{isDeveloper ? (
										<Link to="/manage-app">
											<button
												className="btn btn-info"
												onClick={handleManageButton}
											>
												Manage App
											</button>
										</Link>
									) : (
										<></>
									)}
									<br />
									{isDeveloper ? (
										<Link to="/add-table">
											<button className="btn btn-info create_table_btn">
												Add Table
											</button>
										</Link>
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
						<div className="box_two">
							<h2>Runnable Apps</h2>
							<div className="row">
								{runnableApps?.map((runnableApp) => (
									<DashboardApp
										key={runnableApp.app._id}
										runnableApp={runnableApp.app}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
