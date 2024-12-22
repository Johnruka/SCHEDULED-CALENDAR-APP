import React, { useState } from 'react';
import './Settings.css'; 

const Settings = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // You would typically send settings to a backend server here
        console.log('Settings saved:', settings);
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
                        {/* Add more time zones as needed */}
                    </select>
                </div>

                <div className="form-group">
                    <label className="label">Start of the Week:</label>
                    <select name="startOfWeek" value={settings.startOfWeek} onChange={handleChange}>
                        <option value="Monday">Monday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;



