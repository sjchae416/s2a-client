import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	createAppAPI,
	// updateAppAPI,
	createViewAPI,
	updateAppAPI,
	// updateUserAPI,
} from '../api';
import Modal from '@mui/material/Modal';

const Sidebar = ({
	setReloadApp,
	setView,
	viewName,
	checkUnsavedData,
	app,
	setAppData,
	viewDatas,
	setViewDatas,
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const navigate = useNavigate();

	const handleSaveClick = () => {
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	const saveViews = async (viewDatas) => {
		try {
			const newViews = await Promise.all(
				viewDatas?.map(async (viewData) => {
					return await createViewAPI(viewData);
				})
			);

			return newViews;
		} catch (error) {
			console.error('Error saving new View: ', error);
			throw new Error(error);
		}
	};

	const saveApp = async (appData, savedViews) => {
		try {
			const newViewsIds = savedViews.map((savedView) => savedView._id);
			appData.views = newViewsIds;

			const newApp = await createAppAPI(appData);

			return newApp;
		} catch (error) {
			console.error('Error saving new App', error);
			throw new Error(error);
		}
	};

	// FIXME if the selected App exits, update the field with passed id(selectedAppId)
	// const updateApp = async (selectedAppId) => {
	// if (selectedAppId) {
	// const update = {
	// 	appData,
	// 	lastModifiedDate: new Date().toLocaleString('en-US', {
	// 		timeZone: 'America/New_York',
	// 	}),
	// };
	// 	await updateAppAPI(selectedAppId, update);
	// } else {
	// };

	const handleSaveApp = async () => {
		if (viewDatas) {
			try {
				// if (selectedAppId) {
				//  // TODO if there are new viewDdta, save Views
				// 	// TODO pass selected App's id to update its fields
				// 	await updateAppAPI(selectedAppId);
				// } else {
				const savedViews = await saveViews(viewDatas);
				await saveApp(app, savedViews);
				// }
				setAppData(null);
				setViewDatas(null);
				setReloadApp(true);
				navigate('/');
			} catch (error) {
				window.alert(error);
				console.error('Error while saving the Views or App: ', error);
				setIsModalVisible(false);
			}
		} else {
			window.alert('Create at least one Table View!');
			setIsModalVisible(false);
		}
	};

	return (
		<div className="col-1 border-right text-center">
			<button
				onClick={() => {
					// FIXME won't work; same reason in the ManageAppPage; plus, it can always go back to the App section
					// TODO but remain crrently typed input fields for viewData
					// if (viewName) {
					// 	if (
					// 		window.confirm(
					// 			'You have unsaved changes, Are you sure you want to leave!'
					// 		) === true
					// 	) {
					// 		setView('app');
					// 	}
					// } else {
					setView('app');
					// }
				}}
			>
				App
			</button>
			<hr />
			<button onClick={() => setView('view')}>View</button>
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
						onClick={handleSaveApp}
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
