import React, { useEffect } from 'react';
import { FaLeaf, FaRecycle, FaHandsHelping } from 'react-icons/fa';
import './style/CelebrationAnimation.css';

const CelebrationAnimation = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); 
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="celebration-overlay">
            <div className="celebration-content">
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="confetti" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: `hsl(${Math.random() * 120 + 80}, 70%, 50%)`  // Nuanțe de verde
                        }} />
                    ))}
                </div>
                <div className="celebration-message">
                    <div className="eco-icons">
                        <FaLeaf className="eco-icon" />
                        <FaRecycle className="eco-icon" />
                        <FaHandsHelping className="eco-icon" />
                    </div>
                    <h2>Excellent Choice!</h2>
                    <p>By consuming your food, you've helped:</p>
                    <div className="eco-stats">
                        <div className="stat">
                            <span>Reduce CO2</span>
                            <p>Less food waste means lower emissions</p>
                        </div>
                        <div className="stat">
                            <span>Save Resources</span>
                            <p>Water and energy preserved</p>
                        </div>
                        <div className="stat">
                            <span>Fight Hunger</span>
                            <p>Better food management helps everyone</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CelebrationAnimation;
