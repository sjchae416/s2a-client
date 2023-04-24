import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TableViewSidebar = ({ views, onSelectView }) => {
    const tableApps = views.filter(view => view.viewType === 'Table');
    const tableLinks = tableApps.map(view => (
        <button
        key={view.name}
        onClick={() => onSelectView(view)}
        className="button-link"
        >
        {view.name}
        </button>
    ));

    return (
        <div className="sidebar">
        <h3>Table Views</h3>
        <ul className="no-bullets">{tableLinks}</ul>
        </div>
    );
}

export default TableViewSidebar;