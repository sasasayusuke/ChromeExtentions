import React from 'react';
import './App.css';
import MainComponent from './MainComponent'; // MainComponentのインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MainComponent />  // MainComponentの使用
      </header>
    </div>
  );
}

export default App;
