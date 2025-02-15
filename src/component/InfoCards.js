// Import necessary dependencies for card components
import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';

const InfoCards = ({ darkMode }) => {
  // Define card information with titles, descriptions and visual properties
  const cardInfo = [
    {
      title: "Benefits of Food Consumption",
      text: "Consuming food provides essential nutrients and energy for our bodies, supports overall health, and promotes growth and development.",
      variant: "success",
      icon: "🌱"
    },
    {
      title: "Disadvantages of Food Waste",
      text: "Food waste contributes to environmental pollution, increases greenhouse gas emissions, and results in economic losses. It also means fewer resources for those in need.",
      variant: "danger",
      icon: "♻️"
    }
  ];

  return (
    // Container with dynamic theme based on dark mode
    <Container fluid className={`mt-5 ${darkMode ? 'dark' : 'light'}`}>
      {/* Responsive grid layout for cards */}
      <Row className="justify-content-center">
        {cardInfo.map((card, index) => (
          // Individual card wrapper
          <Col md={5} key={index} className="d-flex align-items-stretch">
            {/* Card with dynamic background color */}
            <Card 
              bg={card.variant.toLowerCase()} 
              text="white"
              className="mb-2 w-100 info-card"
            >
              <Card.Body className="d-flex flex-column p-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2" style={{ fontSize: '2rem' }}>{card.icon}</span>
                  <Card.Title className="mb-0">{card.title}</Card.Title>
                </div>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default InfoCards;
