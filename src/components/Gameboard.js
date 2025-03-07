import React, { useState, useEffect, useCallback } from "react";
import PlayerTurn from "./PlayerTurn";
import Timer from "./Timer";
import WordHistory from "./WordHistory";
import ScoreBoard from "./ScoreBoard";
import axios from "axios";

export const Gameboard = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [wordHistory, setWordHistory] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setTimerActive(true);
    setWordHistory([]);
    setScores({ player1: 0, player2: 0 });
    setCurrentPlayer(1);
    setCurrentWord("");
    setError("");
    setTimeLeft(30);
  };

  const switchTurn = useCallback(() => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    setTimeLeft(30);
    setTimerActive(true);
    setError("");
  }, []);

  const handleTimeUp = useCallback(() => {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      if (currentPlayer === 1) {
        newScores.player1 = Math.max(0, newScores.player1 - 1);
      } else {
        newScores.player2 = Math.max(0, newScores.player2 - 1);
      }
      return newScores;
    });

    switchTurn();
  }, [currentPlayer, switchTurn]);

  useEffect(() => {
    if (timerActive && timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, timerActive, handleTimeUp]);

  const validateWord = async (word) => {
    if (word.length < 4) {
      setError("Word must be at least 4 letters long.");
      return false;
    }

    if (wordHistory.includes(word.toLowerCase())) {
      setError("This word has already been used");
      return false;
    }

    if (wordHistory.length > 0) {
      const lastWord = wordHistory[wordHistory.length - 1];
      const lastLetter = lastWord.charAt(lastWord.length - 1);

      if (word.charAt(0).toLowerCase() !== lastLetter.toLowerCase()) {
        setError(`Word must start with the letter '${lastLetter}'!`);
        return false;
      }
    }

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.data && response.data.length > 0) {
        return true;
      } else {
        setError("Not a valid English word!");
        return false;
      }
    } catch (error) {
      setError("Not a valid English word");
      return false;
    }
  };

  const handleWordSubmit = async (word) => {
    if (!word.trim()) return;

    setTimerActive(false);
    const isValid = await validateWord(word.trim());

    if (isValid) {
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (currentPlayer === 1) {
          newScores.player1 += 1;
        } else {
          newScores.player2 += 1;
        }
        return newScores;
      });

      setWordHistory((prevHistory) => [...prevHistory, word.toLowerCase()]);
      setCurrentWord("");
      switchTurn();
    } else {
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (currentPlayer === 1) {
          newScores.player1 = Math.max(0, newScores.player1 - 1);
        } else {
          newScores.player2 = Math.max(0, newScores.player2 - 1);
        }
        return newScores;
      });

      setTimerActive(true);
    }
  };

  return (
    <div className="game-board">
      {!gameStarted ? (
        <div className="start-screen">
          <h2>Welcome to Shiritori!</h2>
          <p>
            Players take turns entering words that begin with the last letter of
            the previous word. Words must be at least 4 letters long and can't
            be repeated.
          </p>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <ScoreBoard scores={scores} />

          <div className="game-area">
            <div>
              <h2>Player {currentPlayer}'s Turn</h2>
              <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} active={timerActive} />
            </div>

            {error && <div className="error-message">{error}</div>}

            <PlayerTurn
              currentPlayer={currentPlayer}
              onSubmit={handleWordSubmit}
              currentWord={currentWord}
              setCurrentWord={setCurrentWord}
              lastWord={wordHistory.length > 0 ? wordHistory[wordHistory.length - 1] : null}
            />

            <WordHistory wordHistory={wordHistory} />
          </div>
        </>
      )}
    </div>
  );
};

export default Gameboard;