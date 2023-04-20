import { fetchTokenAPI } from './authApi';
import {
	createApp,
	getAllApps,
	getAppById,
	updateApp,
	deleteApp,
} from './appApi';
import {
	createUser,
	getAllUsers,
	getUserByEmail,
	updateUser,
	deleteUser,
} from './userApi';

import {
	createTable,
	readAllTables,
	readTable,
	updateTable,
	deleteTable,
} from './tableApi';

import {
	createView,
	readAllViews,
	readView,
	updateView,
	deleteView,
} from './viewApi';

export {
	fetchTokenAPI,
	createApp,
	getAllApps,
	getAppById,
	updateApp,
	deleteApp,
	createUser,
	getAllUsers,
	getUserByEmail,
	updateUser,
	deleteUser,
	createTable,
	readAllTables,
	readTable,
	updateTable,
	deleteTable,
	createView,
	readAllViews,
	readView,
	updateView,
	deleteView,
};
