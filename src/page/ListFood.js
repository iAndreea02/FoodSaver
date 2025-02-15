// Import necessary dependencies from React
import React, { useEffect, useState } from 'react';
import TodoList from '../component/ToDos';

// ListFood component - Wrapper component that provides the minimum date for the TodoList
function ListFood() {
    // State to store the minimum date that can be selected
    const [minDate, setMinDate] = useState('');
    
    // Effect hook to set the minimum date to today when the component mounts
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);
    
    // Render TodoList component with the minimum date prop
    return (
        <TodoList minDate={minDate} />
    );
}

export default ListFood;