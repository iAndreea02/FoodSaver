import React from 'react';
import { FaApple, FaCarrot, FaBreadSlice, FaEgg } from 'react-icons/fa';
import { GiTomato } from 'react-icons/gi';
import './LoadingScreen.css';

const LoadingScreen = ({ theme }) => {
    return (
        <div className={`loading-screen ${theme}`}>
            <div className="food-container">
                <div className="food-circle">
                    <FaApple className="food-item item1" />
                    <FaCarrot className="food-item item2" />
                    <GiTomato className="food-item item3" />
                    <FaBreadSlice className="food-item item4" />
                    <FaEgg className="food-item item5" />
                </div>
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
