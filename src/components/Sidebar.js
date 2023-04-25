import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApp, updateApp } from '../api/appApi';
import { updateUser } from '../api/userApi';
import Modal from '@mui/material/Modal';

const Sidebar = ({
	setView,
	viewName,
	checkUnsavedData,
	user,
	setUser,
	appIds,
	app,
	setApp,
	viewData,
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const navigate = useNavigate();

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

			if (viewData !== null) {
				app.views = viewData._id;
      }
      
			const newApp = await createApp(app);
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
		} catch (error) {
			window.alert(error);
			// TODO RIYA
			// FIXME close the save model when OK of the window.alert() is clicked
			console.error('Error while creating the App', error);
		}
	};

	const handleSaveClick = () => {
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	const handleSaveChanges = async () => {
		await saveApp(app);
		// await saveApp(app, appId);
		setIsModalVisible(false);
	};

	return (
		<div className="col-1 border-right text-center">
			<button
				onClick={() => {
					if (viewName) {
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
			<button onClick={checkUnsavedData}>Publish</button>
			<hr />

			<button id="save-changes" onClick={handleSaveClick}>
				Save
			</button>
			<hr />
			<Modal open={isModalVisible} onClose={handleModalClose}>
				<div className="modal-content">
					<h5>Save Changes</h5>
					<h5>Would you like to save your changes before proceeding?</h5>
					<button
						onClick={() => navigate('/')}
						className="btn btn-danger"
						id="dismiss_create_app_modals"
					>
						Discard
					</button>
					<button
						onClick={handleSaveChanges}
						className="btn btn-success"
						id="save-changes-btns"
					>
						Save
					</button>
					<button
						onClick={handleModalClose}
						className="btn btn-danger"
						id="save-changes-btn"
					>
						Cancel
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Sidebar;
