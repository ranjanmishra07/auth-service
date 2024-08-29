import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/form.css";
import { AuthProvider } from './context/AuthContext'; // Make sure AuthProvider is correctly imported

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);