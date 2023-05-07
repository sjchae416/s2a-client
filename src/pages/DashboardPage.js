import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DashboardApp, NavigationBar } from '../components';
import UserContext from '../UserContext';

export default function DashboardPage({
	isDeveloper,
	userTables,
	setAppData,
	setReloadApp,
	runnableApps,
}) {
	const { user, setUser } = useContext(UserContext);

	const handleManageTableButton = () => {
		setReloadApp(false);
	};

	const handleManageButton = () => {
		setAppData(null);
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
				<NavigationBar user={user} />
				<br />

				<div className="card">
					<div className="box_one">
						<div className="box_three">
							<div className="row">
								<div className="col-auto">
									{isDeveloper ? (
										<div>
											{userTables ? (
												<div>
													<Link to="/add-table">
														<button
															className="btn btn-info create_table_btn"
															onClick={handleManageTableButton}
														>
															Manage Table
														</button>
													</Link>
												</div>
											) : (
												<div>Loading Tables...</div>
											)}

											{runnableApps ? (
												<div>
													<Link to="/manage-app">
														<button
															className="btn btn-info"
															onClick={handleManageButton}
														>
															Manage App
														</button>
													</Link>
												</div>
											) : (
												<div>Loading Manageable Apps...</div>
											)}
										</div>
									) : (
										<div>
											<p>You have no access Managing Apps and Tables</p>
											<p>Ask Deployer to add you as a Global Developer</p>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="box_two">
							<h2 className="my-5 display-3 fw-bold ls-tight px-3">
								Runnable Apps
							</h2>
							<div className="row">
								{runnableApps ? (
									runnableApps?.map((runnableApp) => (
										<DashboardApp
											key={runnableApp.app._id}
											runnableApp={runnableApp.app}
										/>
									))
								) : (
									<h3>Loading Runnable Apps...</h3>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
