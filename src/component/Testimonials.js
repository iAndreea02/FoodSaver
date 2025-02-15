import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const testimonials = [
  {
    name: "John Doe",
    role: "Regular User",
    text: "This app has helped me reduce food waste significantly. Highly recommended!",
    avatar: "😊"
  },
  {
    name: "Jane Smith",
    role: "Food Enthusiast",
    text: "A fantastic tool for managing my pantry and saving money on groceries.",
    avatar: "👩"
  },
  {
    name: "Emily Johnson",
    role: "Home Chef",
    text: "I love how easy it is to track expiration dates and plan meals accordingly.",
    avatar: "👨‍🍳"
  },
];

const Testimonials = ({ darkMode }) => {
  return (
    <Container className="mt-5 px-3" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">What Our Users Say</h2>
      <Row className="testimonials-container justify-content-center">
        {testimonials.map((testimonial, index) => (
          <Col xs={12} lg={4} className="d-flex align-items-stretch mb-4" key={index}>
            <Card className={`testimonial-card w-100 border-0 ${darkMode ? 'dark' : 'light'}`}>
              <Card.Body className="d-flex flex-column">
                <div className="testimonial-avatar mb-3">
                  <span role="img" aria-label="avatar">
                    {testimonial.avatar}
                  </span>
                </div>
                <Card.Text className="testimonial-text mb-3">"{testimonial.text}"</Card.Text>
                <div className="testimonial-info mt-auto">
                  <div className={`testimonial-name ${darkMode ? 'text-light' : 'text-dark'}`}>
                    {testimonial.name}
                  </div>
                  <div className={`testimonial-role ${darkMode ? 'text-light-50' : 'text-muted'}`}>
                    {testimonial.role}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
