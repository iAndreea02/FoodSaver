import React from 'react';
import waste1 from './img/waste1.jpg';
import waste3 from './img/m1.jpeg';
import w4 from './img/w4.jpg';

const ExampleCarouselImage = ({ text }) => {
    return (
      <img
        className="w-100 mx-auto"
        style={{ height: "40vh", objectFit: "cover" }}
        src={(() => {
            switch (text) {
                case "waste1":
                    return waste3;
                    case "waste2":
                    return waste1;
                    case "waste4":
                    return w4;
                default:
                    return null;
            }
        })()}
        alt={text}
      />
    );
  };

export default ExampleCarouselImage;
