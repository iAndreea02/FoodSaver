// Import required dependencies and components

//webpack.DefinePlugin is not a constructor => WHY:( 
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import NavBarBS from './component/NavBarBS';
import AppRoutes from './routes/AppRoutes';
import Footer from './component/Footer';
import LoadingScreen from './loading/LoadingScreen';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create context for theme management across the application
export const ThemeContext = createContext(null);

function App() {
  // Initialize theme state with value from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  }); 
  
  // Loading state to control initial application render
  const [isLoading, setIsLoading] = useState(true);

  // Persist theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Modify loadComponents to use static imports instead of dynamic ones
  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Check if required components exist
        if (NavBarBS && Footer && AppRoutes) {
          // Add delay for smooth loading transition
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error('Error loading components:', error);
        setIsLoading(false);
      }
    };

    loadComponents();
  }, []);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Show loading screen while components are being loaded
  if (isLoading) {
    return <LoadingScreen theme={theme} />;
  }

  // Main application render with theme context provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Router>
          <div className="App">
            <NavBarBS darkMode={theme === 'dark'} toggleTheme={toggleTheme} />
            <div className="content">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
