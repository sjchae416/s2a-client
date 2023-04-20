import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage, AddTablePage } from './pages';
import { TableView } from './components';
// FIXME import this together in line 6 || (from './pages' part)
import RunnableAppPage from './pages/RunnableAppPage';

export const customHistory = createBrowserHistory();

const App = () => {
	const [user, setUser] = useState(null);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
	const [viewIds, setViewIds] = useState([]);
	const [app, setApp] = useState(null);
	const [tables, setTables] = useState([]);
	const [views, setViews] = useState([]);

	const loadAppIds = (user) => {
		setAppIds(user.apps);
	};

	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	const loadViewIds = (user) => {
		setViewIds(user.views);
	};

	useEffect(() => {
		console.log('🚀 ~ file: App.js:61 ~ App ~ user:', user);
		if (user !== null) {
			loadAppIds(user);
			loadTableIds(user);
			// loadViewIds(user)
		}
	}, [user]);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={
							// NOTE keep these comments for backup
							// user ? (
							<DashboardPage user={user} setUser={setUser} />
							// ) : (
							// 	<Navigate to="/login" />
							// )
						}
					/>
					<Route
						path="/login"
						element={
							// NOTE keep these comments for backup
							// user ? <Navigate to="/" /> :
							<LoginPage />
						}
					/>
					<Route
						path="/manage-app"
						element={
							<ManageAppPage
								user={user}
								setUser={setUser}
								appIds={appIds}
								setAppIds={setAppIds}
								app={app}
								setApp={setApp}
								viewIds={viewIds}
								setViewIds={setViewIds}
							/>
						}
					/>
					<Route
						path="/add-table"
						element={
							<AddTablePage
								user={user}
								setUser={setUser}
								tableIds={tableIds}
								setTableIds={setTableIds}
								tables={tables}
								setTables={setTables}
							/>
						}
					/>
					{/* FIXME use conditional rendering, not path routing, for TableView in RunnableAppPage */}
					<Route path="/table-view" element={<TableView />} />
					<Route
						path="/runnable-appIds/:name"
						element={<RunnableAppPage user={user} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
