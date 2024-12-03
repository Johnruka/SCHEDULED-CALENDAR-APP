import React from 'react';

const AlertMessage = (props) => {
    return (
    <div className={`alert alert-${props.color} text-center`} role="alert">
        {props.icon && <span className='me-2'>{props.icon}</span>} {props.message}
    </div>
    );
};

export default AlertMessage;