import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ApplicationPage from './components/ApplicationPage';
import HomePage from './components/HomePage';


const AppRoutes: React.FC = () => {
    const authContext = useContext(AuthContext);
  return (

    <Router>
      <Routes>
      <Route path="/" element={
          authContext?.isAuthenticated ? <ApplicationPage /> : <HomePage />
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/application" element={
          authContext?.isAuthenticated ? <ApplicationPage /> : <HomePage />
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;