// Polyfills:
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'babel-es6-polyfill/es6-shim'
import 'babel-es6-polyfill/browser-polyfill'
import 'core-js/es/object/get-own-property-descriptors'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const BASE_URL = 'http://192.168.245.70:8000'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App BASE_URL={BASE_URL}/>
    </React.StrictMode>
);


