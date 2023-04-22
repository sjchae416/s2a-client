import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createApp, updateApp } from '../api/appApi';
import { updateUser } from '../api/userApi';

const Sidebar = ({
	setView,
	viewName,
	myfun,
	user,
	setUser,
	appIds,
	app,
	setApp,
}) => {
	const { isViewSelected } = useSelector((state) => state.app);

	const navigate = useNavigate();

	// FIXME prevent duplicate names being saved from server side and alert error
	const saveApp = async (app) => {
		// const saveApp = async (app, appId) => {
		try {
			// FIXME if the App alreadly exits, update the field with passed id(appId), else creat and save
			// if (appId) {
			// const update = {
			// 	app,
			// 	lastModifiedDate: new Date().toLocaleString('en-US', {
			// 		timeZone: 'America/New_York',
			// 	}),
			// };
			// 	await updateApp(appId, update);
			// } else {
			const newApp = await createApp(app);
			// REVIEW newApp error handled in the createApp(); returns newApp or error
			// if (newApp) {
			var newAppIds = [];
			if (appIds) {
				newAppIds = [...appIds, newApp._id];
			} else {
				newAppIds = [newApp._id];
			}
			const update = { apps: newAppIds };
			const updatedUser = await updateUser(user._id, update);

			setApp(null);
			setUser(updatedUser);
			navigate('/');

			// }
			// }
		} catch (error) {
			window.alert(error);
      // TODO RIYA
			// FIXME close the save model when OK of the window.alert() is clicked
			console.error('Error while creating the App', error);
		}
	};

	const handleSave = async () => {
		await saveApp(app);
		// await saveApp(app, appId);
	};

	// save changes modal
	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#save-changes');
		const create_app_modal = document.querySelector('#save-changes-modals');
		const dismiss_create_app_modal = document.querySelector(
			'#dismiss_create_app_modals'
		);
		const create_app_btn = document.querySelector('#save-changes-btn');

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
		<div className="col-1 border-right text-center">
			<button
				onClick={() => {
					if (!isViewSelected && viewName) {
						if (
							window.confirm(
								'You have unsaved changes, Are you sure you want to leave!'
							) === true
						) {
							setView(1);
						}
					} else {
						setView(1);
					}
				}}
			>
				App
			</button>
			<hr />
			<button onClick={() => setView(4)}>View</button>
			<hr />
			<button onClick={myfun}>Publish</button>
			<hr />

			<button id="save-changes">Save</button>
			<hr />
			{/* FIXME move it into a new modal component file (SaveModal.js) and render it */}
			<div className="modal" id="save-changes-modals">
				<div className="modal-dialog-centered">
					<div className="modal-content">
						<div className="card">
							<div className="form-group save_ur_chnage">
								<h5>Save Changes</h5>
								<h5>Would you like to save your changes before proceeding?</h5>
								<button
									onClick={() => navigate('/')}
									className="btn btn-danger "
									id="dismiss_create_app_modals"
								>
									Discard
								</button>
								<button
									onClick={handleSave}
									className="btn btn-success"
									id="save-changes-btns"
								>
									Save
								</button>
								<button className="btn btn-danger " id="save-changes-btn">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
