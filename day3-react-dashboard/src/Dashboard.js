import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import List from './components/List';
import Form from './components/Form';
import './Dashboard.css';

/**
 * Main Dashboard Component
 * Day 7: Integrated with TypeScript API (GET /items endpoint)
 * 
 * Demonstrates:
 * - Component composition
 * - State management with useState & useEffect
 * - Async data fetching from API
 * - Loading, error, and empty states
 * - TypeScript API response handling
 * - Event handling
 * - Props passing
 * - Conditional rendering
 */
const Dashboard = () => {
    // State: User name
    const [userName] = useState('John Doe');
    
    // State: List items (now fetched from API)
    const [items, setItems] = useState([]);
    
    // State: Loading state
    const [loading, setLoading] = useState(true);
    
    // State: Error state
    const [error, setError] = useState(null);
    
    /**
     * useEffect: Fetch items from API on component mount
     * Day 7: Connects React UI to TypeScript API
     * 
     * Flow:
     * 1. Component mounts
     * 2. Set loading = true
     * 3. Fetch GET /items from API at http://localhost:3001
     * 4. Receive typed response: ApiResponse<ItemsResponse>
     * 5. Transform API data to match List component structure
     * 6. Set items in React state
     * 7. Set loading = false
     * 8. On error: set error state and loading = false
     */
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Call TypeScript API endpoint
                const response = await fetch('http://localhost:3001/items');
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                
                // Parse JSON response (ApiResponse<ItemsResponse>)
                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(data.error || 'API returned unsuccessful response');
                }
                
                // Transform API items to match List component structure
                // API: { id, name, description, category, price, inStock, createdAt }
                // List: { id, name, description, date }
                const transformedItems = data.data.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    date: new Date(item.createdAt).toISOString().split('T')[0], // Convert createdAt to date
                    category: item.category,
                    price: item.price,
                    inStock: item.inStock
                }));
                
                setItems(transformedItems);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch items:', err);
                setError(err.message || 'Failed to fetch items from API');
                setLoading(false);
            }
        };
        
        // Fetch items when component mounts
        fetchItems();
    }, []); // Empty dependency array = run once on mount
    
    
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
                    {/* List Component - Now fetches from API */}
                    <div className="grid-item">
                        {loading && (
                            <div className="dashboard-list">
                                <div className="list-header">
                                    <h2>Recent Activities</h2>
                                </div>
                                <p style={{ textAlign: 'center', padding: '20px' }}>
                                    ⏳ Loading items from API...
                                </p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="dashboard-list">
                                <div className="list-header">
                                    <h2>Recent Activities</h2>
                                </div>
                                <p style={{ textAlign: 'center', padding: '20px', color: '#ef4444' }}>
                                    ❌ Error: {error}
                                </p>
                                <p style={{ textAlign: 'center', padding: '10px', fontSize: '0.9em', color: '#666' }}>
                                    Make sure the API is running on http://localhost:3001
                                </p>
                            </div>
                        )}
                        
                        {!loading && !error && items.length === 0 && (
                            <div className="dashboard-list">
                                <div className="list-header">
                                    <h2>Recent Activities</h2>
                                </div>
                                <p style={{ textAlign: 'center', padding: '20px' }}>
                                    📭 No items found in API
                                </p>
                            </div>
                        )}
                        
                        {!loading && !error && items.length > 0 && (
                            <List
                                items={items}
                                onItemClick={handleItemClick}
                                onItemDelete={handleItemDelete}
                            />
                        )}
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
