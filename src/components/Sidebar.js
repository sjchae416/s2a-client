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
	app,
	setAppData,
	selectedApp,
	setSelectedApp,
	viewDatas,
	setViewDatas,
	viewDataList,
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);

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

	function checkTableView(viewDatas) {
		for (let i = 0; i < viewDatas.length; i++) {
			if (viewDatas[i].viewType === 'Table') {
				return true;
			}
		}
		return false;
	}

	const handleSaveApp = async () => {
		if(selectedApp !== null) {
			// handle updating an app and then navigate to dashboard
			// TODO - check if the existing views have atleast one table view
			//console.log("existing app case");
			navigate('/');
		}
		else if (app!==null && viewDatas && checkTableView(viewDatas)) {
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
				// TODO delete viewDatas.views when failed to create the App
				window.alert(error);
				console.error('Error while saving the Views or App: ', error);
				setIsModalVisible(false);
			}
		} else {
			window.alert('Create at least one Table View!');
			setIsModalVisible(false);
		}
	};

	const handlePublish = () => {
		if (app && (viewDatas || viewDataList.length !== 0)) {
			app.published = true;
			setAppData(app);
			handleSaveApp(app);
		}
		setIsPublishModalVisible(false);
	};

	const handleDiscard = () => {
		setSelectedApp(null);
		navigate('/');
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
			<button onClick={() => setIsPublishModalVisible(true)}>Publish</button>
			<hr />
			<button onClick={handleSaveClick}>Save</button>
			<hr />

			<Modal open={isModalVisible} onClose={handleModalClose}>
				<div className="modal-content">
					<h5>Save Changes</h5>
					<h5>Would you like to save your changes before proceeding?</h5>

					<button
						onClick={handleDiscard}
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

			<Modal
				open={isPublishModalVisible}
				onClose={() => setIsPublishModalVisible(false)}
			>
				<div className="modal-content">
					<h5>
						Would you like to publish your app? <br /> If not, it will be saved
						under in development and will not be available to users.
					</h5>

					<button
						onClick={() => setIsPublishModalVisible(false)}
						className="btn btn-danger"
					>
						No
					</button>
					<button onClick={handlePublish} className="btn btn-success">
						Yes
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Sidebar;
