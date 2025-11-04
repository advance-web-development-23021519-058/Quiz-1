import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
// CRITICAL: Importing the CSS here ensures Tailwind classes (including custom colors and dark mode utilities) are loaded.
import './index.css';

import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

// Since we are not using the real Vite entry point file structure, 
// we must include all necessary context providers here to wrap the App.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>

        <App />

      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
