import { render } from 'react-dom';
import React from 'react';
import App from './components/App';

const app = document.getElementById('app');
console.log(app);
console.log(render, App);
render(<App/>, app);