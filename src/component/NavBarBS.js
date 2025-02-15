// Import necessary dependencies and components
import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaHome, FaEnvelope, FaAppleAlt, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../App';
import './style/NavBarBS.css';

const NavBarBS = () => {
    // Get theme context and set up state
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    // Function to check if the current route matches the link
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Auto-collapse navbar when route changes
    useEffect(() => {
        setExpanded(false);
    }, [location]);

    return (
        // Main navigation wrapper
        <>
            {/* Responsive navbar with dynamic theme */}
            <Navbar 
                expanded={expanded}
                expand="lg" 
                variant="dark"
                fixed="top"
                className={`custom-navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
                onToggle={(expanded) => setExpanded(expanded)}
            >
                {/* Container for navbar content */}
                <Container>
                    {/* Brand logo and title */}
                    <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)} className='fs-3'>
                        <FaUtensils className="me-2" />
                        FoodSaver
                    </Navbar.Brand>
                    {/* Navigation links and theme toggle */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-5">
                            <Nav.Link 
                                as={Link} 
                                to="/" 
                                onClick={() => setExpanded(false)}
                                className={isActive('/') ? 'active-link' : ''}
                            >
                                <FaHome className="me-1" /> Home
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/foods" 
                                onClick={() => setExpanded(false)}
                                className={isActive('/foods') ? 'active-link' : ''}
                            >
                                <FaAppleAlt className="me-1" /> Foods
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/contact" 
                                onClick={() => setExpanded(false)}
                                className={isActive('/contact') ? 'active-link' : ''}
                            >
                                <FaEnvelope className="me-1" /> Contact
                            </Nav.Link>
                            <div className="switch" onClick={toggleTheme}>
                                {theme === 'light' ? <FaMoon /> : <FaSun />}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="navbar-space" />
        </>
    );
};

export default NavBarBS;