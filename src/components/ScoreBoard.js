import React from 'react'

function ScoreBoard({scores}) {
  return (
    <div className='score-board'>
        <div className='player-score'>
            <h3>Player 1</h3>
            <div>{scores.player1}</div>
        </div>
        <div className='player-score'>
            <h3>Player 2</h3>
            <div>{scores.player2}</div>
        </div>
    </div>
  )
}

export default ScoreBoard