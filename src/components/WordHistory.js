import React from 'react'

function WordHistory({ wordHistory = [] }) {
    return (
      <div className="word-history">
        <h3>Word History</h3>
        {wordHistory.length === 0 ? (
          <p>No words played yet</p>
        ) : (
          <div className="history-list">
            {wordHistory.map((word, index) => (
              <span key={index} className="history-word">
                {word}
                {index < wordHistory.length - 1 && " -> "}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
  
export default WordHistory;  