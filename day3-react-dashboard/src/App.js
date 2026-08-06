import React from 'react';
import Dashboard from './Dashboard';

/**
 * Main App Component
 * 
 * Day 3 Learning Objectives Covered:
 * ✅ Components - Modular, reusable UI pieces
 * ✅ JSX - JavaScript XML syntax
 * ✅ Props - Passing data from parent to child
 * ✅ State - Managing dynamic data with useState
 * ✅ Event Handling - User interactions
 * ✅ Forms - Controlled inputs with validation
 * ✅ Conditional Rendering - Show/hide based on conditions
 * ✅ Lists - Mapping arrays to components
 */
function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
