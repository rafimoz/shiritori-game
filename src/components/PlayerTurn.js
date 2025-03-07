import React from 'react'

function PlayerTurn({currentPlayer, onSubmit, currentWord, setCurrentWord, lastWord }) {
    const handleSubmit = (e) =>{
        e.preventDefault()
        onSubmit(currentWord)
    };


  return (
    <div className='player-turn'>
        <form onSubmit={handleSubmit}>
            {lastWord && (
                <div className='last-word-hint'>
                    Last word: <strong>{lastWord}</strong>
                    <span className='last-letter'>(next word start with "{lastWord.charAt(lastWord.length - 1)}")</span>
                </div>
            )}

            <input
                type="text"
                value={currentWord}
                onChange={(e) => setCurrentWord(e.target.value)}
                placeholder={`Player ${currentPlayer}, enter a word...`}
                autoFocus
            />
            <button type='submit'>Submit</button>
        </form>
    </div>
  );
}

export default PlayerTurn