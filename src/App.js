import React from 'react';
import './App.css';
import GameBoard from './components/Gameboard';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Shiritori Game</h1>
      </header>

      <main>
        <GameBoard />
      </main>

      <footer>
        <p>Multiplayer Shiritori Game - MERN Assesment</p>
      </footer>
    </div>
  );
}
export default App;
