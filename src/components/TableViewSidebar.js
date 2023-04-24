import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TableViewSidebar = ({ views, onSelectView }) => {
    const tableApps = views.filter((view) => view.viewType === 'Table');
    const tableLinks = tableApps.map((view) => (
        <li key={view.name} onClick={() => onSelectView(view)}>
        {view.name}
        </li>
    ));

    return (
        <div className="sidebar">
        <h3>Table Views</h3>
        <ul>{tableLinks}</ul>
        </div>
    );
}

export default TableViewSidebar;