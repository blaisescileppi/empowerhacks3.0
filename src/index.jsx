import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Register the SW (Vite-safe pathing)
if ('serviceWorker' in navigator) {
    const swURL = `${import.meta.env.BASE_URL}service-worker.js`;
    navigator.serviceWorker.register(swURL)
      .catch((err) => console.error('SW registration failed:', err));
  }
  