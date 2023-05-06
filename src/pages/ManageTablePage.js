import React, { useState, useContext } from 'react';
import { TableConfig, List, NavigationBar } from '../components';
import UserContext from '../UserContext';

export default function ManageTablePage({
	setReloadApp,
	tableIds,
	userTables,
	setTables,
}) {
	const { user, setUser } = useContext(UserContext);
	const [selectedTable, setSelectedTable] = useState(null);
	const [addTable, setAddTable] = useState(false);

	return (
		<div>
			<br />
			<br />
			<div className="container">
				<NavigationBar
					user={user}
					setAddTable={setAddTable}
					addTable={addTable}
				/>
				<br />
				<h3>Create New Table</h3>
				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<div className="col-1 border-right text-center">
							<button
								onClick={() => {
									setSelectedTable(null);
									setAddTable(!addTable);
								}}
							>
								Add Table
							</button>
							<List
								tableIds={tableIds}
								type="table"
								userTables={userTables}
								setSelectedTable={setSelectedTable}
							/>
						</div>
						<div className="col-auto">
							<TableConfig
								setReloadApp={setReloadApp}
								setTables={setTables}
								user={user}
								setUser={setUser}
								tableIds={tableIds}
								userTables={userTables}
								selectedTable={selectedTable}
								setSelectedTable={setSelectedTable}
								addTable={addTable}
							/>
						</div>
					</div>
				</div>
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}
