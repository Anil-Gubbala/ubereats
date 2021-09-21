import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types';

function App() {
  const [click, setClicked] = useState('true');
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button
          type='button'
          onClick={() => {
            setClicked('false');
          }}
        >
          Hello
        </button>
        <h2>{click}</h2>
      </header>
    </div>
  );
}

App.propTypes = {};

export default App;
