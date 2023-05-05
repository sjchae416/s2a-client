import React from 'react';

const TableViewSidebar = ({ views, onSelectView }) => {
	const tableViews = views.filter((view) => view.viewType === 'Table');

	return (
		<div className="sidebar">
			<h3>Table Views</h3>
			<ul className="no-bullets">
				{tableViews.map((view) => (
					<li key={view._id}>
						<button onClick={() => onSelectView(view)} className="button-link">
							{view.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TableViewSidebar;
