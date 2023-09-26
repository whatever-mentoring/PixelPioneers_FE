import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

import axios from 'axios';
import { API } from './infiniteScroll/utils/constants';
import Api from "./infiniteScroll/utils/api";

const httpClient = axios.create({
  baseURL: API.baseURL
});

const api = new Api(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App api={api} />
  //</React.StrictMode>
);

reportWebVitals();
