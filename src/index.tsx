/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import Appi from './Apps';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);