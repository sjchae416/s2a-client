import React from 'react';

const List = ({
	type,
	tables,
	viewDataList,
	setSelectedView,
	setSelectedTable,
}) => {
	return (
		<div>
			{type === 'view'
				? viewDataList.map((item) => (
						<div key={item.id} onClick={() => setSelectedView(item)}>
							<hr />
							{item.viewName}
						</div>
				  ))
				: tables.map((table) => (
						<div key={table._id} onClick={() => setSelectedTable(table)}>
							<hr />
							{table.name}
						</div>
				  ))}
		</div>
	);
};

export default List;
