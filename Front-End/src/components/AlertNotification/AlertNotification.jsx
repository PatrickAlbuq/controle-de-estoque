import React from 'react';
import './AlertNotification.css';

const AlertNotification = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
            {message}
            <span className="closebtn" onClick={onClose}>&times;</span>
        </div>
    );
};

export default AlertNotification;
