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
	appIds,
	app,
	setAppData,
	// FIXME pass developerApps to the List when displaying apps
	developerApps,
	userTables,
	viewDatas,
	setViewDatas,
}) {
	const { user, setUser } = useContext(UserContext);
	const [view, setView] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewName, setViewName] = useState('');
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [viewType, setViewType] = useState('Table');
	const [allowedAction, setAllowAction] = useState([]);
	const [role, setRole] = useState([]);
	const [viewRole, setViewRole] = useState([]);
	const [viewDataList, setViewDataList] = useState([]);
	const [selectedView, setSelectedView] = useState({});
	const [name, setName] = useState('');
	const [roleMembershipSheet, setRoleMembershipSheet] = useState('');
	const [addView, setAddView] = useState(false);

	let navigate = useNavigate();

	const checkUnsavedData = () => {
		if (viewName) {
			if (
				window.confirm(
					'You have unsaved changes, Are you sure you want to leave!'
				) === true
			) {
				const create_app_modal = document.querySelector(
					'#create-app-modal-publish'
				);
				create_app_modal.style.display = 'block';
			}
		} else {
			const create_app_modal = document.querySelector(
				'#create-app-modal-publish'
			);
			create_app_modal.style.display = 'block';
		}
	};

	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#create-app');
		const create_app_modal = document.querySelector(
			'#create-app-modal-publish'
		);
		const dismiss_create_app_modal = document.querySelector(
			'#dismiss_create_app_modal_publish'
		);

		dismiss_create_app_modal.onclick = (event) => {
			create_app_modal.style.display = 'none';
		};

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
							setAppData={setAppData}
							viewDatas={viewDatas}
							setViewDatas={setViewDatas}
						/>

						{/* FIXME have another one for the App tab */}
						<div className="col-1 border-right text-center">
							{view === 4 && app && (
								<>
									<button
										onClick={() => {
											setSelectedView({});
											setAddView(true);
										}}
									>
										Add View
									</button>
									<List
										type="view"
										viewDatas={viewDatas}
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
										user={user}
										app={app}
										setAppData={setAppData}
										setName={setName}
										name={name}
										setRoleMembershipSheet={setRoleMembershipSheet}
										roleMembershipSheet={roleMembershipSheet}
									/>
								) : view === 4 && app && name && roleMembershipSheet ? (
									<ViewConfig
										viewRole={viewRole}
										userTables={userTables}
										viewDatas={viewDatas}
										setViewDatas={setViewDatas}
										setViewDataList={setViewDataList}
										selectedView={selectedView}
										setSelectedView={setSelectedView}
										addView={addView}
										setAddView={setAddView}
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
										onClick={() => {
											navigate('/');
											setRoleMembershipSheet('');
											setName('');
										}}
										className="btn btn-danger "
										id="dismiss_create_app_modals"
									>
										Discard
									</button>
									<button
										onClick={() => {
											navigate('/');
											setRoleMembershipSheet('');
											setName('');
										}}
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

				<div className="modal" id="create-app-modal-publish">
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
										id="dismiss_create_app_modal_publish"
									>
										No
									</button>
									<button
										onClick={() => navigate('/')}
										className="btn btn-success"
										id="create-app-btn"
									>
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
