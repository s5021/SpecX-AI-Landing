import React, { useState } from 'react';

/**
 * Form Component - Controlled form with validation
 * Props:
 * - onSubmit: Handler when form is submitted
 */
const Form = ({ onSubmit }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        priority: 'medium',
        message: ''
    });
    
    // State for validation errors
    const [errors, setErrors] = useState({});
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    // Validate form data
    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        onSubmit(formData);
        
        // Reset form after successful submission
        setFormData({
            name: '',
            email: '',
            priority: 'medium',
            message: ''
        });
    };
    
    return (
        <div className="dashboard-form">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Enter name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Enter email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className={errors.message ? 'error' : ''}
                        placeholder="Enter message"
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                
                <button type="submit" className="btn btn-primary">
                    ✅ Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
