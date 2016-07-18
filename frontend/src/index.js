import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello'

window.addEventListener('DOMContentLoaded', run, false);

function run() {
  ReactDOM.render(
    <Hello />,
    document.getElementById('app-react-area')
  )
}
