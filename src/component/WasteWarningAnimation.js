import React, { useEffect } from 'react';
import './style/WasteWarningAnimation.css';
import { FaSkull, FaSadTear } from 'react-icons/fa';

const WasteWarningAnimation = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="waste-overlay">
            <div className="waste-content">
                <div className="warning-icons">
                    <FaSkull className="skull-icon" />
                    <FaSadTear className="sad-icon" />
                </div>
                <div className="waste-message">
                    <h2>Food Waste Alert!</h2>
                    <p>Remember: Every bit of food waste impacts our planet.</p>
                    <div className="waste-stats">
                        <div className="stat">
                            <span>1/3</span>
                            <p>of world's food is wasted</p>
                        </div>
                        <div className="stat">
                            <span>3.3B</span>
                            <p>tons of CO2 produced</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WasteWarningAnimation;
