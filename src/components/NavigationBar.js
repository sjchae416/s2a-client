import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateViewAPI } from '../api';

export default function NavigationBar({
	user,
	setAppData,
	setSelectedApp,
	viewDataList,
	setReloadApp,
	backupViews,
}) {
	const [showMenu, setShowMenu] = useState(false);
	let navigate = useNavigate();

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.href = 'http://localhost:3333/auth/logout';
	};

	const areArraysEqual = (arr1, arr2) => {
		if (arr1.length !== arr2.length) return false;

		return arr1.every((obj1) => {
			return arr2.some((obj2) => {
				return areObjectsEqual(obj1, obj2);
			});
		});
	};

	const areObjectsEqual = (obj1, obj2) => {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		if (keys1.length !== keys2.length) return false;

		return keys1.every((key) => {
			if (!keys2.includes(key)) return false;

			if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
				return areArraysEqualIgnoreOrder(obj1[key], obj2[key]);
			}

			return obj1[key] === obj2[key];
		});
	};

	const areArraysEqualIgnoreOrder = (arr1, arr2) => {
		if (arr1.length !== arr2.length) return false;

		return arr1.every((elem1) => {
			return arr2.some((elem2) => {
				if (typeof elem1 === 'object' && typeof elem2 === 'object') {
					return areObjectsEqual(elem1, elem2);
				}

				return elem1 === elem2;
			});
		});
	};

	const restoreViews = async (backupViews) => {
		await Promise.all(
			backupViews?.map(async (backupView) => {
				await updateViewAPI(backupView._id, backupView);
			})
		);
	};

	const handleDiscardToHome = () => {
		setAppData(null);
		setSelectedApp(null);

		const isEqual = areArraysEqual(viewDataList, backupViews);
		if (!isEqual) {
			restoreViews(backupViews);
		}

		setReloadApp(true);
		navigate('/');
	};

	useEffect(() => {
		const create_app_modal_btn = document.querySelector('#save-change');
		const create_app_modal = document.querySelector('#create-app-modals');
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

	return (
		<div className="card text-right card_one">
			<h1 id="save-change">S2A</h1>
			<span className=" ml-auto">
				<span className="profile-letter ml-auto" onClick={toggleMenu}>
					{user.email && user.email.charAt(0).toUpperCase()}
				</span>
				{showMenu && (
					<div className="dropdown-menu">
						<button className="btn-logout-dropdown" onClick={handleLogout}>
							Log Out
						</button>
					</div>
				)}
			</span>

			<div className="modal" id="create-app-modals">
				<div className="modal-dialog-centered">
					<div className="modal-content">
						<div className="card">
							<div className="form-group save_ur_chnage">
								<h5>Save Changes</h5>
								<h5>Would you like to save your changes before proceeding?</h5>
								<button
									onClick={handleDiscardToHome}
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
	);
}
