'use client';

import { useState, useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';
import Image from 'next/image';
import PlayerChoice from './PlayerChoice';

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  const coffeeCupImage = (
    <Image 
      src="/O.jpg" 
      alt="O" 
      width={64}
      height={64}
      className="w-full h-full object-contain opacity-75" 
    />
  );
  const croissantImage = (
    <Image 
      src="/X.jpg" 
      alt="X" 
      width={64}
      height={64}
      className="w-full h-full object-contain opacity-75" 
    />
  );
  let content = null;
  if (value === 'O') {
    content = coffeeCupImage;
  } else if (value === 'X') {
    content = croissantImage;
  }
  return (
    <button
      className="bg-transparent border-2 border-gray-600 h-16 w-16 m-1 leading-9 text-lg text-black drop-shadow-[0_0_2px_white] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:scale-110"
      onClick={onSquareClick}
    >
      {content}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean; squares: Array<string | null>; onPlay: (nextSquares: Array<string | null>) => void }) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<'X' | 'O' | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [wins, setWins] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedWins = localStorage.getItem('ticTacToeWins');
      return savedWins ? parseInt(savedWins, 10) : 0;
    }
    return 0;
  });
  const [losses, setLosses] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLosses = localStorage.getItem('ticTacToeLosses');
      return savedLosses ? parseInt(savedLosses, 10) : 0;
    }
    return 0;
  });
  const [ties, setTies] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTies = localStorage.getItem('ticTacToeTies');
      return savedTies ? parseInt(savedTies, 10) : 0;
    }
    return 0;
  });
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ticTacToeWins', wins.toString());
    }
  }, [wins]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ticTacToeLosses', losses.toString());
    }
  }, [losses]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ticTacToeTies', ties.toString());
    }
  }, [ties]);

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (typeof playerChoice === 'string' && (playerChoice === 'X' || playerChoice === 'O')) { 
        if (winner === playerChoice) {
          setWins(prevWins => prevWins + 1);
        } else {
          setLosses(prevLosses => prevLosses + 1);
        }
      }
    } else if (nextSquares.every(square => square !== null)) {
      setTies(prevTies => prevTies + 1);
    }
  }







  if (!playerChoice) {
    return <PlayerChoice onSelect={(choice) => { setPlayerChoice(choice); setShowGame(true); }} />;
  }
  const winner = calculateWinner(currentSquares);
  let statusMessage;
  if (winner) {
    statusMessage = `Congratulations, Player ${winner}!`;
  } else if (currentSquares.every(square => square !== null)) {
    statusMessage = "It's a Tie!";
  } else {
    statusMessage = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

    const handleRestart = () => {
        setCurrentMove(0);
        setHistory([Array(9).fill(null)]);
        setPlayerChoice(null);
        setShowGame(false); // Hide game and show player choice again
        if (typeof window !== 'undefined') {
          setWins(parseInt(localStorage.getItem('ticTacToeWins') || '0', 10));
          setLosses(parseInt(localStorage.getItem('ticTacToeLosses') || '0', 10));
          setTies(parseInt(localStorage.getItem('ticTacToeTies') || '0', 10));
        }
    };

    const handleResetScoreboard = () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ticTacToeWins');
        localStorage.removeItem('ticTacToeLosses');
        localStorage.removeItem('ticTacToeTies');
      }
      setWins(0);
      setTies(0);
      setLosses(0);
    };

  return (
    <div /* Main game container */ className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ease-out ${showGame ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <h1 className="text-4xl font-bold mb-8 text-black drop-shadow-[0_0_2px_white]" style={{ fontFamily: 'Toasty Milk' }}>Drew's Tic-tac-toe</h1>
      <div className="flex flex-row items-start gap-4">
        <div className="game flex flex-col items-center p-4 border-4 border-gray-400 rounded-lg shadow-lg">
        <div className="game-board relative">
          <div className={`text-xl font-bold mb-2 text-black drop-shadow-[0_0_2px_white] ${winner ? 'animate-bounce' : ''}`}>{statusMessage}</div>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          {winner && (
            <Fireworks
              options={{
                opacity: 0.5,
                traceLength: 0.5,
                traceSpeed: 0.1,
                explosion: 5,
                intensity: 30,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                  min: 0,
                  max: 360
                },
                delay: {
                  min: 15,
                  max: 30
                },
                rocketsPoint: {
                  min: 50,
                  max: 50
                },
                lineWidth: {
                  explosion: {
                    min: 1,
                    max: 3
                  },
                  trace: {
                    min: 1,
                    max: 2
                  }
                },
                brightness: {
                  min: 50,
                  max: 80
                },
                decay: {
                  min: 0.015,
                  max: 0.03
                },
                mouse: {
                  click: false,
                  move: false,
                  max: 1
                }
              }}
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
              background: 'transparent',
              zIndex: 10 
            }}
          />
          )}
        </div>
        </div>
        <div className="scoreboard flex flex-col items-center p-4 border-4 border-gray-400 rounded-lg shadow-lg mt-4">
          <div className="text-lg font-bold text-black drop-shadow-[0_0_2px_white]">
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <p>Ties: {ties}</p>
          </div>
          {(winner || currentSquares.every(square => square !== null)) && (
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-green-700"
              onClick={handleRestart}
            >
              Restart Game
            </button>
          )}
          <button
            className="mt-2 px-6 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-red-700"
            onClick={handleResetScoreboard}
          >
            Reset Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; 
}