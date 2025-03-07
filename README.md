# Multiplayer Shiritori Game

A turn-based word game for two players on the same screen. Players take turns entering valid English words that start with the last letter of the previous word.

## Game Rules

- Players take turns entering words
- Each new word must begin with the last letter of the previous word
- Words must be at least 4 letters long
- Words cannot be repeated
- Words must be valid English words (validated through Dictionary API)
- Each player has 30 seconds to enter a valid word
- Players gain points for valid words and lose points for invalid words or timing out

## Features

- Turn-based gameplay with automatic turn switching
- Word validation (meaning and structure)
- Countdown timer for each turn
- Score tracking
- Word history display

## Setup and Installation

1. Clone the repository:
git clone https://github.com/yourusername/shiritori-game.git
cd shiritori-game

2. Install dependencies:
npm install

3. Start the development server:
npm start

4. Build for production:
npm run build

## Technologies Used

- React.js
- Axios for API requests
- DictionaryAPI (https://dictionaryapi.dev/)

## Deployment

The game is deployed at: [Insert your deployment URL here]

## Assessment Details

This project was created as part of the Nyntax MERN Assessment 2025.
