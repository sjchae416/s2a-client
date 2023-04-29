import React from 'react';
import { Link } from 'react-router-dom';

const DashboardApp = ({ name, lastOpenedDate }) => {
	return (
		<div className="col-3">
			<Link to={`/runnable-appIds/${name}`}>
				<div className="card p-0 text-center">
					<h2 className="">{name}</h2>
					<hr />
					<div className="p-1">
						<small>Last opened: {lastOpenedDate}</small>
					</div>
				</div>
			</Link>
			<br />
		</div>
	);
};

export default DashboardApp;
