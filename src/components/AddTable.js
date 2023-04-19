import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
// removed this - import TableList from "./TableList";
import TableConfig from './TableConfig';
// importing common list component
import List from './List';
import { readAllTables } from '../api/tableApi';
import NavigationBar from '../components/NavigationBar.js';

export default function AddTable({
	googleUser,
	user,
	setUser,
	tableIds,
	setTableIds,
	tables,
	setTables,
	getUserTables,
}) {
	let navigate = useNavigate();
	// useEffect(() => {
	// 	const create_app_modal_btn = document.querySelector('#create-app');
	// 	const create_app_modal = document.querySelector('#create-app-modal');
	// 	const dismiss_create_app_modal = document.querySelector(
	// 		'#dismiss_create_app_modal'
	// 	);
	// 	const create_app_btn = document.querySelector('#create-app-btn');

	// 	create_app_modal_btn.onclick = () => {
	// 		create_app_modal.style.display = 'block';
	// 	};

	// 	window.onclick = (event) => {
	// 		if (event.target === create_app_modal) {
	// 			create_app_modal.style.display = 'none';
	// 		}
	// 	};

	// 	dismiss_create_app_modal.onclick = (event) => {
	// 		create_app_modal.style.display = 'none';
	// 	};
	// 	create_app_btn.onclick = (event) => {
	// 		create_app_modal.style.display = 'none';
	// 	};
	// }, []);

	// REVIEW commented since this reads 'all' Tables; we need user-specific Tables
	// async function fetchTables() {
	// 	const tables = await readAllTables();
	// 	setTables(tables);
	// }

	return (
		<Box>
			<br />
			<br />
			{/* FIXME use NavigationBar Component! */}
			<div className="container">
				<NavigationBar googleUser={googleUser}/>
				<br />

				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<div className="col-1 border-right text-center">
							<button>Table</button>
						</div>
						<div className="col-1 border-right text-center">
							<button>Add Table</button>
							<List type="table" />
						</div>
						<div className="col-auto">
							<TableConfig
								user={user}
								setUser={setUser}
								tableIds={tableIds}
								setTableIds={setTableIds}
								tables={tables}
								setTables={setTables}
								getUserTables={getUserTables}
								// fetchTables={fetchTables}
							/>
							<div className="modal" id="create-app-modal">
								<div className="modal-dialog-centered">
									<div className="modal-content">
										<div className="card">
											<div className="form-group save_ur_chnage">
												<h5>Save Changes</h5>
												<h5>
													Would you like to save your changes before proceeding?
												</h5>
												<button
													className="btn btn-danger "
													id="dismiss_create_app_modal"
												>
													Discard
												</button>
												<button
													onClick={() => navigate('/')}
													className="btn btn-success"
													id="create-app-btns"
												>
													Save
												</button>
												<button className="btn btn-danger" id="create-app-btn">
													Cancel
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<br />
				<br />
			</div>
		</Box>
	);
}
