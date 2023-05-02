import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	createAppAPI,
	createViewAPI,
	deleteViewAPI,
	updateAppAPI,
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
	setViewDataList,
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

	function checkTableView(views) {
		if (views !== null) {
			for (let i = 0; i < views.length; i++) {
				if (views[i].viewType === 'Table') {
					return true;
				}
			}
		}

		return false;
	}

	const saveNewViews = async (viewDatas) => {
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

	const saveNewApp = async (appData, savedViews) => {
		try {
			const newViewsIds = savedViews.map((savedView) => savedView._id);
			appData.views = newViewsIds;
			let newApp;
			try {
				newApp = await createAppAPI(appData);
				return newApp;
			} catch (error) {
				await Promise.all(
					newApp.views?.map(async (viewId) => {
						await deleteViewAPI(viewId);
					})
				);
				console.error('Error creating the new App: ', error);
				return new Error(error);
			}
		} catch (error) {
			console.error('Error saving new App: ', error);
			throw new Error(error);
		}
	};

	const handleSaveApp = async () => {
		if (checkTableView(viewDatas) || checkTableView(selectedApp.createdViews)) {
			try {
				if (selectedApp) {
					const currViewIds = viewDataList.map((view) => {
						return view._id;
					});
					let newViewsIds;
					if (viewDatas) {
						const savedViews = await saveNewViews(viewDatas);
						newViewsIds = savedViews.map((savedView) => savedView._id);
						app.views = [...currViewIds, ...newViewsIds];
					} else {
						app.views = currViewIds;
					}

					const now = new Date();
					const nycTimeString = now.toLocaleString('en-US', {
						timeZone: 'America/New_York',
					});
					app.lastModifiedDate = nycTimeString;

					const update = app;
					try {
						await updateAppAPI(selectedApp._id, update);
					} catch (error) {
						// TODO delete all newViewsIds
						await Promise.all(
							newViewsIds?.map(async (viewId) => {
								await deleteViewAPI(viewId);
							})
						);
						console.error('Error updating the App: ', error);
						return new Error(error);
					}
				} else {
					const savedViews = await saveNewViews(viewDatas);
					await saveNewApp(app, savedViews);
				}
				setAppData(null);
				setViewDataList(null);
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

	const handleUnpublish = () => {
		if (app && (viewDatas || viewDataList)) {
			app.published = false;
			setAppData(app);
		}

		setIsPublishModalVisible(false);
	};

	const handlePublish = () => {
		if (app && (viewDatas || viewDataList)) {
			app.published = true;
			setAppData(app);
		}

		setIsPublishModalVisible(false);
	};

	const handleDiscard = () => {
		setAppData(null);
		setViewDatas(null);
		setViewDataList(null);
		setSelectedApp(null);
		setReloadApp(true);
		navigate('/');
	};

	return (
		<div className="col-1 border-right text-center">
			<button
				onClick={() => {
					setView('app');
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

					<button onClick={() => handleUnpublish} className="btn btn-danger">
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
