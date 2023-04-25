import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import Box from '@mui/material/Box';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import {
	NavigationBar,
	AppConfig,
	Sidebar,
	List,
	ViewConfig,
} from '../components';

export default function ManageAppPage({
	// user,
	// setUser,
	appIds,
	app,
	setApp,
	viewIds,
}) {
	const { user, setUser } = useContext(UserContext);
	const [view, setView] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewName, setViewName] = useState('');
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [viewType, setViewType] = useState('Table');
	const [allowedAction, setAllowAction] = useState([]);
	const [role, setRole] = useState([]);

	let navigate = useNavigate();

	//=============
	// new state
	const [viewRole, setViewRole] = useState([]);
	const [viewDataList, setViewDataList] = useState([]);
	const [selectedView, setSelectedView] = useState({});

	// FIXME have an appropriate and descriptive function name --- fixed
	const checkUnsavedData = () => {
		if (viewName) {
			if (
				window.confirm(
					'You have unsaved changes, Are you sure you want to leave!'
				) == true
			) {
				const create_app_modal = document.querySelector('#create-app-modal');
				create_app_modal.style.display = 'block';
			}
		} else {
			const create_app_modal = document.querySelector('#create-app-modal');
			create_app_modal.style.display = 'block';
		}
	};

	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#create-app');
		const create_app_modal = document.querySelector('#create-app-modal');
		const dismiss_create_app_modal = document.querySelector(
			'#dismiss_create_app_modal'
		);
		const create_app_btn = document.querySelector('#create-app-btn');

		if (create_app_modal_btn) {
			create_app_modal_btn.onclick = () => {
				create_app_modal.style.display = 'block';
			};
		}

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

	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#save-change');
		const create_app_modal = document.querySelector('#save-change-modal');
		const dismiss_create_app_modal = document.querySelector(
			'#dismiss_create_app_modals'
		);
		const create_app_btn = document.querySelector('#save-change-btn');

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

	const handleSaveClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirmClick = () => {
		setIsModalOpen(false);
	};

	const handleCancelClick = () => {
		setIsModalOpen(false);
	};

	return (
		<Box>
			<br />
			<br />
			<div className="container">
				<NavigationBar user={user} />
				<br />
				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<Sidebar
							setView={setView}
							viewName={viewName}
							checkUnsavedData={checkUnsavedData} // replaces myfun
							user={user}
							setUser={setUser}
							appIds={appIds}
							app={app}
							setApp={setApp}
						/>

						<div className="col-1 border-right text-center">
							{view === 4 && app && (
								<>
									<button onClick={() => setSelectedView({})}>Add View</button>
									<List
										type="view"
										viewDataList={viewDataList}
										setSelectedView={setSelectedView}
									/>
								</>
							)}
						</div>

						<div className="col-auto">
							<div className="container">
								<br />
								{view === 1 ? (
									<AppConfig
										setViewRole={setViewRole}
										email={user.email}
										user={user}
										app={app}
										setApp={setApp}
									/>
								) : view === 4 && app ? (
									<ViewConfig
										user={user}
										role={role}
										setRole={setRole}
										allowedAction={allowedAction}
										setAllowAction={setAllowAction}
										viewType={viewType}
										setViewType={setViewType}
										selectedColumns={selectedColumns}
										setSelectedColumns={setSelectedColumns}
										viewName={viewName}
										setViewName={setViewName}
										setUser={setUser}
										viewIds={viewIds}
										// =================
										viewRole={viewRole}
										setViewDataList={setViewDataList}
										selectedView={selectedView}
										setSelectedView={setSelectedView}
									/>
                  ) : (
									<div>Configure the app first</div>
								)}

								<br />
								<br />
							</div>
						</div>
					</div>
				</div>
				<div className="modal" id="save-change-modal">
					<div className="modal-dialog-centered">
						<div className="modal-content">
							<div className="card">
								<div className="form-group save_ur_chnage">
									<h5>Save Changes</h5>
									<h5>
										Would you like to save your changes before proceeding?
									</h5>
									<button
										onClick={() => navigate('/')}
										className="btn btn-danger "
										id="dismiss_create_app_modals"
									>
										Discard
									</button>
									<button
										onClick={() => navigate('/')}
										className="btn btn-success"
										id="save-change-btns"
									>
										Save
									</button>
									<button className="btn btn-danger " id="save-change-btn">
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="modal" id="create-app-modal">
					<div className="modal-dialog-centered">
						<div className="modal-content">
							<div className="card">
								<div className="form-group save_ur_chnage">
									<h5>
										Would you like to publish your app? <br /> If not, it will
										be saved under in development and will not be available to
										users.
									</h5>
									<button
										className="btn btn-danger"
										id="dismiss_create_app_modal"
									>
										No
									</button>
									<button className="btn btn-success" id="create-app-btn">
										Yes
									</button>
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
