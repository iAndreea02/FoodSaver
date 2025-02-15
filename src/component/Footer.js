// Import necessary dependencies
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Import custom styles for footer component
import './style/Footer.css';

// Footer component displays copyright information and additional footer content
const Footer = () => {
  return (
    // Main footer container with dark theme
    <footer className="footer bg-dark text-white mt-0 p-4 text-center">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2025 FoodSaver. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
