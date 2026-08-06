import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import List from './components/List';
import Form from './components/Form';
import './Dashboard.css';

/**
 * Main Dashboard Component
 * Demonstrates:
 * - Component composition
 * - State management with useState
 * - Event handling
 * - Props passing
 * - Conditional rendering
 */
const Dashboard = () => {
    // State: User name
    const [userName] = useState('John Doe');
    
    // State: List items
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Project Alpha',
            description: 'Initial setup complete',
            date: '2026-08-05'
        },
        {
            id: 2,
            name: 'Project Beta',
            description: 'In progress - Backend API development',
            date: '2026-08-04'
        },
        {
            id: 3,
            name: 'Project Gamma',
            description: 'Planning phase - Requirements gathering',
            date: '2026-08-03'
        }
    ]);
    
    // Event Handler: Logout
    const handleLogout = () => {
        alert('Logging out... (Demo)');
    };
    
    // Event Handler: Item click
    const handleItemClick = (item) => {
        console.log('Clicked item:', item);
        alert(`Item Details:\n\nName: ${item.name}\nDescription: ${item.description}\nDate: ${item.date}`);
    };
    
    // Event Handler: Delete item
    const handleItemDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };
    
    // Event Handler: Form submission
    const handleFormSubmit = (formData) => {
        const newItem = {
            id: items.length + 1,
            name: formData.name,
            description: formData.message,
            date: new Date().toISOString().split('T')[0],
            email: formData.email,
            priority: formData.priority
        };
        setItems([newItem, ...items]); // Add to beginning of array
        alert('✅ Item added successfully!');
    };
    
    return (
        <div className="dashboard">
            {/* Header Component with Props */}
            <Header 
                title="SpecX AI Dashboard" 
                userName={userName}
                onLogout={handleLogout}
            />
            
            <div className="dashboard-content">
                {/* Cards Grid - Demonstrating Props */}
                <div className="cards-grid">
                    <Card
                        title="Total Projects"
                        value="24"
                        icon="📊"
                        trend={12}
                        color="#6366f1"
                    />
                    <Card
                        title="Active Users"
                        value="1,284"
                        icon="👥"
                        trend={8}
                        color="#10b981"
                    />
                    <Card
                        title="Revenue"
                        value="$45,290"
                        icon="💰"
                        trend={-3}
                        color="#f59e0b"
                    />
                    <Card
                        title="Tasks Completed"
                        value="89%"
                        icon="✅"
                        trend={5}
                        color="#8b5cf6"
                    />
                </div>
                
                {/* Two Column Layout */}
                <div className="dashboard-grid">
                    {/* List Component - Demonstrating Arrays & Conditional Rendering */}
                    <div className="grid-item">
                        <List
                            items={items}
                            onItemClick={handleItemClick}
                            onItemDelete={handleItemDelete}
                        />
                    </div>
                    
                    {/* Form Component - Demonstrating State & Events */}
                    <div className="grid-item">
                        <Form onSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
