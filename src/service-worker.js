/* offline support, React comes with a service worker, but must enable it first */
// research this more!!!
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// This registers the service worker (for offline use)
serviceWorkerRegistration.register();
