// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="home-page">
      <h1>Welcome to Our Application</h1>
      <div className="button-container">
        <button className="home-button" onClick={handleSignUpClick}>
          Sign Up
        </button>
        <button className="home-button" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default HomePage;
