// Import necessary dependencies and components
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './components/ExampleCarouselImage';
import InfoCards from '../component/InfoCards';
import Testimonials from '../component/Testimonials';
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import './Home.css'; // Import custom CSS for additional styling
import { ThemeContext } from '../App'; // Import ThemeContext

// Home component - Main landing page of the application
const Home = () => {
  // Get theme from context for dark/light mode
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Handler for the "Get Started" button click
  const handleGetStarted = () => {
    navigate('/foods');
  };

  return (
    <Container fluid className={`p-0 ${theme}`}>
      {/* Hero Carousel Section - Displays rotating banner images with captions */}
      <Carousel className='container-fluid p-0'>
        <Carousel.Item interval={2000}>
          <ExampleCarouselImage text="waste1" />
          <Carousel.Caption>
            <h3>Reduce Food Waste</h3>
            <p>Join us in the fight against food waste.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <ExampleCarouselImage text="waste2" />
          <Carousel.Caption>
            <h3>Save Money</h3>
            <p>Plan your meals and save money on groceries.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <ExampleCarouselImage text="waste4" />
          <Carousel.Caption>
            <h3>Help the Environment</h3>
            <p>Reduce your carbon footprint by minimizing food waste.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     
      {/* Information Cards Section - Displays key features */}
      <InfoCards darkMode={theme === 'dark'} />

      {/* Testimonials Section - Displays user reviews */}
      <Testimonials darkMode={theme === 'dark'} />

      {/* FAQ Section - Displays frequently asked questions */}
      <Container fluid className={`my-5 ${theme} px-2`}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>How does FoodSaver help reduce food waste?</Accordion.Header>
                <Accordion.Body>
                  FoodSaver helps you track expiration dates, plan meals, and manage your pantry to reduce food waste.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Is FoodSaver free to use?</Accordion.Header>
                <Accordion.Body>
                  Yes, FoodSaver is free to use with optional premium features available.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>How can I get started with FoodSaver?</Accordion.Header>
                <Accordion.Body>
                  Simply sign up for an account and start tracking your food items.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Call to Action Section - Final banner with get started button */}
      <Container fluid className="text-center bg-primary text-white py-5 hero-section mb-5">
        <Row>
          <Col>
            <h1>Welcome to FoodSaver</h1>
            <p>
              Join us in the fight against food waste. Save food, save money, save the planet.
            </p>
            <Button variant={`${theme}`} size="lg" onClick={handleGetStarted}>Get Started</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;