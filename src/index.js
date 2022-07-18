import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const strictMode = process.env.NODE_ENV === 'production';
root.render(
	(strictMode && (
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	)) || <BrowserRouter> <App /></BrowserRouter>
);

