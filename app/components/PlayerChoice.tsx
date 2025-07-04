import React from 'react';
import { PLAYER_SYMBOLS } from '../constants/game';

interface PlayerChoiceProps {
  onSelect: (choice: 'X' | 'O') => void;
}

const PlayerChoice: React.FC<PlayerChoiceProps> = ({ onSelect }) => {
  const gameTitle = "Drew's Tic-tac-toe";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-black drop-shadow-[0_0_2px_white]" style={{ fontFamily: 'Toasty Milk' }}>Drew's Tic-tac-toe</h1>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-black drop-shadow-[0_0_2px_white]">Choose your symbol:</h2>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cover hover:bg-center hover:bg-no-repeat hover:bg-[url('/X.jpg')] hover:text-transparent cursor-pointer transform translate-y-1 active:translate-y-0 active:shadow-none shadow-md"
            onClick={() => onSelect(PLAYER_SYMBOLS.X)}
          >
            Play as X
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cover hover:bg-center hover:bg-no-repeat hover:bg-[url('/O.jpg')] hover:text-transparent cursor-pointer transform translate-y-1 active:translate-y-0 active:shadow-none shadow-md"
            onClick={() => onSelect(PLAYER_SYMBOLS.O)}
          >
            Play as O
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlayerChoice;
