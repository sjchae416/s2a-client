import React, { useState, useContext } from 'react';
import { TableConfig, List, NavigationBar } from '../components';
import UserContext from '../UserContext';

export default function AddTablePage({ tableIds, tables }) {
	const { user, setUser } = useContext(UserContext);
	const [selectedTable, setSelectedTable] = useState(null);
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
							<button
								onClick={() => {
									setSelectedTable(null);
									setAddTable(!addTable);
								}}
							>
								Add Table
							</button>
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
								tables={tables}
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
