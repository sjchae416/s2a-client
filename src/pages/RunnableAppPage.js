import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {NavigationBar, TableView, TableViewSidebar} from '../components';
import UserContext from '../UserContext';

const view1 = {
	name: 'test1',
	table: {
		name: 'test',
		url: 'https://docs.google.com/spreadsheets/d/1yHt-_Pbu52TJW3znWxo9VlHnHOQaFVvRMTpkrWYtM_s/edit#gid=1530492309',
		sheetIndex: 'Sheet1',
		columns: [
			{
				name: 'Name',
				key: 'true',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Email',
				key: 'false',
				label: 'true',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Class',
				key: 'false',
				label: 'false',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Grade',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Passed',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'bool',
			},
		],
	},
	columns: ['Name', 'Email','Class'],
	viewType: 'Table',
	allowedActions: ['Add Record', 'Delete Record'],
	roles: ['Developer'],
	filter: 'Passed',
	userFilter: '',
	editFilter: '',
	editableCols: [],
};

const view2 = {
	name: 'test2',
	table: {
		name: 'test',
		url: 'https://docs.google.com/spreadsheets/d/1yHt-_Pbu52TJW3znWxo9VlHnHOQaFVvRMTpkrWYtM_s/edit#gid=1530492309',
		sheetIndex: 'Sheet1',
		columns: [
			{
				name: 'Name',
				key: 'true',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Email',
				key: 'false',
				label: 'true',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Class',
				key: 'false',
				label: 'false',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Grade',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Passed',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'bool',
			},
		],
	},
	columns: ['Name', 'Email','Class', 'Grade'],
	viewType: 'Detail',
	allowedActions: ['Edit Record', 'Delete Record'],
	roles: ['Developer'],
	filter: '',
	userFilter: '',
	editFilter: 'Passed',
	editableCols: ['Class', 'Grade'],
};

const view3 = {
	name: 'test3',
	table: {
		name: 'test',
		url: 'https://docs.google.com/spreadsheets/d/1yHt-_Pbu52TJW3znWxo9VlHnHOQaFVvRMTpkrWYtM_s/edit#gid=1530492309',
		sheetIndex: 'Sheet1',
		columns: [
			{
				name: 'Name',
				key: 'true',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Email',
				key: 'false',
				label: 'true',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Class',
				key: 'false',
				label: 'false',
				reference: 'test1',
				type: 'string',
			},
			{
				name: 'Grade',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'string',
			},
			{
				name: 'Passed',
				key: 'false',
				label: 'false',
				reference: 'test2',
				type: 'bool',
			},
		],
	},
	columns: ['Name', 'Email','Class', 'Grade'],
	viewType: 'Table',
	allowedActions: ['Add Record'],
	roles: ['Developer'],
	filter: 'Passed',
	userFilter: '',
	editFilter: '',
	editableCols: [],
};

const views = [view1, view2, view3];

export default function RunnableAppPage() {
	const { name } = useParams();
	const [selectedView, setSelectedView] = useState(null);
	const { user, setUser } = useContext(UserContext);


	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	return (
		<div>
			<br/>
			<br/>
			<NavigationBar user={user} />
			<h2>{name}</h2>
			<div className="page-container">
				<div className="sidebar-container">
					<TableViewSidebar views={views} onSelectView={handleSelectView} />
				</div>
				<div className="main-container">
					{selectedView && <TableView view={selectedView} listViews = {views}/>}
				</div>
			</div>
		</div>
		
	);
}
