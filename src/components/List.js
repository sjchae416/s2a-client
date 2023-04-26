import React from 'react';

const List = ({
	type,
	tables,
	viewDataList,
	setSelectedView,
	setSelectedTable,
}) => {
	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	const handleSelectTable = (table) => {
		setSelectedTable(table);
	};

	return (
		<div>
			{type === 'view'
				? viewDataList.map((view) => (
						<div key={view.id} onClick={() => handleSelectView(view)}>
							<hr />
							{view.viewName}
						</div>
				  ))
				: tables.length > 0 &&
				  tables.map(
						(table) =>
							table !== null && (
								<div key={table._id} onClick={() => handleSelectTable(table)}>
									<hr />
									{table.name}
								</div>
							)
				  )}
		</div>
	);
};

export default List;
