import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const BASE_URL = 'http://192.168.101.70:8000'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App BASE_URL={BASE_URL}/>
    </React.StrictMode>
);


