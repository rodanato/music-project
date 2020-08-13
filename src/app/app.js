// @flow

import React from 'react';

function App() {
  const firstN : string = 45;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {firstN}
        </a>
      </header>
    </div>
  );
}

export default App;
