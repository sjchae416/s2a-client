import React, { useState, useContext } from 'react';
import { TableConfig, List, NavigationBar } from '../components';
import UserContext from '../UserContext';

export default function AddTablePage({
	// user,
	// setUser,
	tableIds,
	setTableIds,
	tables,
	setTables,
}) {
	const { user, setUser } = useContext(UserContext);
	const [selectedTable, setSelectedTable] = useState({});
	const [addTable, setAddTable] = useState(false);

	return (
		<div>
			<br />
			<br />
			<div className="container">
				<NavigationBar user={user} />
				<br />

				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<div className="col-1 border-right text-center">
							<button>Table</button>
						</div>
						<div className="col-1 border-right text-center">
							<button onClick={() => setAddTable(!addTable)}>Add Table</button>
							<List
								type="table"
								tables={tables}
								setSelectedTable={setSelectedTable}
							/>
						</div>
						<div className="col-auto">
							<TableConfig
								user={user}
								setUser={setUser}
								tableIds={tableIds}
								setTableIds={setTableIds}
								tables={tables}
								setTables={setTables}
								selectedTable={selectedTable}
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
