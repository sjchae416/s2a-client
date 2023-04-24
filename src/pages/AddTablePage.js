import React, { useState } from 'react';
import { TableConfig, List, NavigationBar} from '../components';

export default function AddTablePage({
	user,
	setUser,
	tableIds,
	setTableIds,
	tables,
	setTables,
}) {
  const [selectedTable, setSelectedTable] = useState({});
  const [addTable, setAddTable] = useState(false);

	return (
		<div>
			<br />
			<br />
			{/* FIXME use NavigationBar Component! */}
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
              <List type="table" setSelectedTable={setSelectedTable} />
            </div>
            <div className="col-auto">
              <TableConfig
                user={user}
                setUser={setUser}
                tableIds={tableIds}
                setTableIds={setTableIds}
                tables={tables}
                setTables={setTables}
                // fetchTables={fetchTables}
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
