import React, { useState } from 'react';
import axios from 'axios';
import './Settings.css'; 

const Settings = () => {
    const apiEndPoint = "http://localhost:8080/api/settings";   
    const [settings, setSettings] = useState({
        defaultView: 'week',
        timeZone: 'UTC',
        startOfWeek: 'Monday',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Submitting settings:', settings);
        
            const response = await axios.post(apiEndPoint, settings);
            console.log('Settings saved successfully:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('Network error or no response:', error.request);
            } else {
                console.error('Error in request setup:', error.message);
            }
            console.error('Config:', error.config);    
        }
    };

    const handleSave = () => {
        console.log('Save settings:', settings);
        // Implement your save logic here if needed
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Default View:</label>
                    <select name="defaultView" value={settings.defaultView} onChange={handleChange}>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Time Zone:</label>
                    <select name="timeZone" value={settings.timeZone} onChange={handleChange}>
                        <option value="UTC">UTC</option>
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                        <option value="MST">MST</option>
                        <option value="CST">CST</option>
                        <option value="GMT">GMT</option>               
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Start of the Week:</label>
                    <select name="startOfWeek" value={settings.startOfWeek} onChange={handleChange}>
                        <option value="Monday">Monday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Settings;


