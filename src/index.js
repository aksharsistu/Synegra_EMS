import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-app-polyfill/ie9'

const BASE_URL = 'http://10.4.19.2:8000'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App BASE_URL={BASE_URL}/>
    </React.StrictMode>
);


