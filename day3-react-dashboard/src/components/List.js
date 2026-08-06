import React, { useState } from 'react';

/**
 * List Component - Displays filterable list of items
 * Props:
 * - items: Array of items to display
 * - onItemClick: Handler when item is clicked
 * - onItemDelete: Handler when delete button is clicked
 */
const List = ({ items, onItemClick, onItemDelete }) => {
    const [filter, setFilter] = useState('');
    
    // Filter items based on search input
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
        <div className="dashboard-list">
            <div className="list-header">
                <h2>Recent Activities</h2>
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <ul className="list-items">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <li 
                            key={item.id} 
                            className="list-item"
                            onClick={() => onItemClick(item)}
                        >
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <span className="item-date">📅 {item.date}</span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent item click when deleting
                                    onItemDelete(item.id);
                                }}
                                className="btn-delete"
                            >
                                🗑️ Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="empty-message">No items found</p>
                )}
            </ul>
        </div>
    );
};

export default List;
