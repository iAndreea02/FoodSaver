// Import required dependencies and styles
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Contact component for handling user messages and displaying contact information
const Contact = () => {
    // Theme context for dark/light mode
    const { theme } = useContext(ThemeContext);
    
    // State management for loading, emoji animation and form data
    const [isLoading, setIsLoading] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });

    // Handle form submission and email sending
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Replace these with your actual EmailJS credentials
        emailjs.send(
            'service_nor3zg8',
            'template_pyqndbm',
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.description,
            },
            'M4EsgRjoyq8jPz1m3'
        )
        .then((result) => {
            setIsLoading(false);
            setShowEmoji(true);
            setTimeout(() => setShowEmoji(false), 3000);
            console.log('Email sent successfully:', result.text);
            setFormData({ name: '', email: '', description: '' });
            alert('Message sent successfully!');
        })
        .catch((error) => {
            setIsLoading(false);
            console.error('Error sending email:', error);
            alert('Failed to send message. Please try again.');
        });
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Render component with butterfly animations, contact info, and contact form
    return (
        <Container fluid className={`contact-container ${theme}`}>
            <div className="butterflies">
                {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className={`butterfly butterfly-${num}`}>
                        <svg width="30" height="30" viewBox="0 0 40 40">
                            <path className="wing" d="M20,15 Q25,0 35,10 Q25,20 20,15" />
                            <path className="wing" d="M20,15 Q15,0 5,10 Q15,20 20,15" />
                            <path className="wing" d="M20,15 Q25,30 35,20 Q25,10 20,15" />
                            <path className="wing" d="M20,15 Q15,30 5,20 Q15,10 20,15" />
                        </svg>
                    </div>
                ))}
            </div>
            <div className="gradient-overlay"></div>
            
            <Row className="content-wrapper m-0">
                <Col md={5} className="contact-info-column">
                    <div className="info-content">
                        <div className="title-section">
                            <h2 className="main-title">Get in Touch</h2>
                            <div className="title-decoration">
                                <span className="line"></span>
                                <span className="dot"></span>
                                <span className="line"></span>
                            </div>
                            <p className="subtitle">We'd love to hear from you!</p>
                        </div>
                        
                        <div className="info-box">
                            <div className="info-item bounce-hover">
                                <div className="icon-wrapper">
                                    <span className="emoji-icon">🏠</span>
                                </div>
                                <div className="info-text">
                                    <h4>Location</h4>
                                    <p>123 My Home, Galati</p>
                                </div>
                            </div>

                            <div className="info-divider"></div>

                            <div className="info-item bounce-hover">
                                <div className="icon-wrapper">
                                    <span className="emoji-icon">📞</span>
                                </div>
                                <div className="info-text">
                                    <h4>Phone</h4>
                                    <p>+40 123 456 789</p>
                                </div>
                            </div>

                            <div className="info-divider"></div>

                            <div className="info-item bounce-hover">
                                <div className="icon-wrapper">
                                    <span className="emoji-icon">✉️</span>
                                </div>
                                <div className="info-text">
                                    <h4>Email</h4>
                                    <p>contact@foodsaver.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={7} className="form-column">
                    <div className="form-wrapper">
                        <h3 className="form-title">Send us a Message</h3>
                        <Form onSubmit={handleSubmit} className="contact-form">
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Your Message"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="loading-animation">
                                        <span>📨</span>
                                        <span>Sending</span>
                                    </div>
                                ) : 'Send Message'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>

            {showEmoji && (
                <div className="success-emoji">
                    <span>🎉</span>
                    <span>✨</span>
                    <span>🌟</span>
                </div>
            )}
        </Container>
    );
};

export default Contact;
