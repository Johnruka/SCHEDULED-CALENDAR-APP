import React, { useState } from 'react';
import axios from 'axios';
import { FaSave } from 'react-icons/fa';

const Settings = () => {
    const apiEndPoint = "http://localhost:8080/api/settings";
    const [settings, setSettings] = useState({
        defaultView: 'week',
        timeZone: 'UTC',
        startOfWeek: 'Monday',
        language: 'English',
        timeFormat: '24h',  // Add timeFormat to settings state
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
                <div className="form-group">
                    <label className="label">Language:</label>
                    <select name="language" value={settings.language} onChange={handleChange}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Time Format:</label>  {/* Add timeFormat form group */}
                    <select name="timeFormat" value={settings.timeFormat} onChange={handleChange}>
                        <option value="12h">12-hour</option>
                        <option value="24h">24-hour</option>
                    </select>
                </div>
                <button className="btn" type="submit">
                    <FaSave style={{ marginRight: '8px' }} /> Save
                </button>
            </form>
        </div>
    );
};

export default Settings;

const styles = `
.settings-container {
    font-family: Arial, sans-serif;
    max-width: auto;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid hsla(245, 75%, 41%, 0.833);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #dcdae3;
}

.settings-container h2 {
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #32107c;
}

select {
    width: 100%;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;  /* Ensures white text for readability */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

