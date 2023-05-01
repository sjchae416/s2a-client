import React from 'react';
import { Link } from 'react-router-dom';

const DashboardApp = ({ runnableApp }) => {
	return (
		<div className="col-3">
			<Link
				to={{
					pathname: `/runnable-appIds/${runnableApp._id}`,

				}}
			>
				<div className="card p-0 text-center">
					<h2 className="">{runnableApp.name}</h2>
					<hr />
					<div className="p-1">
						<small>Last opened: {runnableApp.lastOpenedDate}</small>
					</div>
				</div>
			</Link>
			<br />
		</div>
	);
};

export default DashboardApp;
