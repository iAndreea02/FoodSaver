import React from 'react';

const NotificationAlert = ({ notification }) => {
    if (!notification.show) return null;
    
    return (
        <div className={`alert alert-${notification.type} position-fixed bottom-0 end-0 m-3`} 
             style={{ zIndex: 1050, marginBottom: '80px' }}>
            {notification.message}
        </div>
    );
};

export default NotificationAlert;
