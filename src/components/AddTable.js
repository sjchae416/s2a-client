import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
// removed this - import TableList from "./TableList";
import Table from './Table';
// importing common list component
import List from './List';

import NavigationBar from './NavigationBar';

export default function AddTable({ googleUser }) {
	const [tablelist, setTableList] = useState([]);

	let navigate = useNavigate();
	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#create-app');
		const create_app_modal = document.querySelector('#create-app-modal');
		const dismiss_create_app_modal = document.querySelector(
			'#dismiss_create_app_modal'
		);
		const create_app_btn = document.querySelector('#create-app-btn');

		create_app_modal_btn.onclick = () => {
			create_app_modal.style.display = 'block';
		};

		window.onclick = (event) => {
			if (event.target === create_app_modal) {
				create_app_modal.style.display = 'none';
			}
		};

		dismiss_create_app_modal.onclick = (event) => {
			create_app_modal.style.display = 'none';
		};
		create_app_btn.onclick = (event) => {
			create_app_modal.style.display = 'none';
		};
	}, []);

	return (
		<Box>
			<br />
			<br />
			<div className="container">
				<div className="card text-right card_one">
					<h3 id="create-app">S2A</h3>

					<span className=" ml-auto">
						<button className="btn btn-info"> {'<'} </button>&nbsp;
						<span className=" ml-auto" />
						<button className="btn btn-info"> {'>'} </button>&nbsp;
						<span className=" ml-auto" />
						<button className="btn btn-info">Save</button>&nbsp;
						<a className="profile-letter" href="profile.html">
							P
						</a>
					</span>
				</div>

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
							<Table tablelist={tablelist} setTableList={setTableList} />
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
