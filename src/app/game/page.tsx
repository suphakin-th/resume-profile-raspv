"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define types for Tetris
type CellType = [number, string, string?]; // [value, status, color?]
type StageType = CellType[][];
type TetrominoKey = '0' | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

interface TetrominoType {
  shape: number[][];
  color: string;
}

interface PlayerType {
  pos: {
    x: number;
    y: number;
  };
  tetromino: number[][];
  collided: boolean;
  tetrominoColor: string;
}

// Tetris piece shapes and colors
const TETROMINOS: Record<TetrominoKey, TetrominoType> = {
  '0': { shape: [[0]], color: '0, 0, 0' },
  'I': {
    shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    color: '80, 227, 230' // Cyan
  },
  'J': {
    shape: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    color: '36, 95, 223' // Blue
  },
  'L': {
    shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    color: '223, 173, 36' // Orange
  },
  'O': {
    shape: [[1, 1], [1, 1]],
    color: '223, 217, 36' // Yellow
  },
  'S': {
    shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    color: '48, 211, 56' // Green
  },
  'T': {
    shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    color: '132, 61, 198' // Purple
  },
  'Z': {
    shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    color: '227, 78, 78' // Red
  }
};

// Random tetromino generator
const randomTetromino = (): TetrominoType => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)] as TetrominoKey;
  return TETROMINOS[randTetromino];
};

// Create empty stage (game board)
const createStage = (): StageType => 
  Array.from(Array(20), () => Array(10).fill([0, 'clear'] as CellType));

const TetrisGame: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [stage, setStage] = useState<StageType>(createStage());
  const [paused, setPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Player state
  const [player, setPlayer] = useState<PlayerType>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS['0'].shape,
    collided: false,
    tetrominoColor: '0, 0, 0'
  });

  // Load high score from local storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('tetrisHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('tetrisHighScore', score.toString());
    }
  }, [score, highScore]);

  // Focus game area
  useEffect(() => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  }, []);

  // Reset game
  const startGame = (): void => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000); // Initial drop time (ms)
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setPaused(false);
    
    // Create new tetromino
    const newTetromino = randomTetromino();
    setPlayer({
      pos: { x: 4, y: 0 }, // Start position
      tetromino: newTetromino.shape,
      collided: false,
      tetrominoColor: newTetromino.color
    });
  };

  // Pause/unpause game
  const togglePause = (): void => {
    if (gameOver) return;
    
    if (paused) {
      setDropTime(1000 / (level + 1));
    } else {
      setDropTime(null);
    }
    setPaused(!paused);
  };

  // Check if player collided with anything
  const checkCollision = (
    player: PlayerType, 
    stage: StageType, 
    { x: moveX, y: moveY }: { x: number, y: number }
  ): boolean => {
    for (let y = 0; y < player.tetromino.length; y++) {
      for (let x = 0; x < player.tetromino[y].length; x++) {
        // 1. Check that we're on a tetromino cell
        if (player.tetromino[y][x] !== 0) {
          // 2. Check if our move is inside the game area's height (y)
          if (!stage[y + player.pos.y + moveY] ||
            // 3. Check if our move is inside the game area's width (x)
            !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            // 4. Check if the cell we're moving to isn't set to 'clear'
            stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Rotate a tetromino
  const rotate = (matrix: number[][], dir: number): number[][] => {
    // Make the rows become columns (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );
    
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  // Rotate player tetromino
  const rotatePlayer = (dir: number): void => {
    if (paused || gameOver) return;
    
    // Deep clone the player object
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as PlayerType;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    
    // Check collision after rotation
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    
    // Move the tetromino left or right if there's a collision
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      
      // If offset is too big, rotation is not possible
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    
    setPlayer(clonedPlayer);
  };

  // Move player left/right
  const movePlayer = (dir: number): void => {
    if (paused || gameOver) return;
    
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      setPlayer(prev => ({
        ...prev,
        pos: {
          x: prev.pos.x + dir,
          y: prev.pos.y
        }
      }));
    }
  };

  // Check if row is full
  const checkRows = useCallback((newStage: StageType): StageType => {
    let rowsCleared = 0;
    
    const sweepRows = newStage.reduce<StageType>((acc, row) => {
      // If we don't find a 0 (empty cell), the row is full
      if (row.findIndex(cell => cell[0] === 0) === -1) {
        rowsCleared += 1;
        // Add an empty row at the top
        acc.unshift(new Array(newStage[0].length).fill([0, 'clear'] as CellType));
        return acc;
      }
      acc.push(row);
      return acc;
    }, []);
    
    if (rowsCleared > 0) {
      // Calculate score based on rows cleared and level
      const linePoints = [40, 100, 300, 1200]; // Original Nintendo scoring
      setScore(prev => prev + linePoints[Math.min(rowsCleared, 4) - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
    
    return sweepRows;
  }, [level]);

  // Update stage
  const updateStage = useCallback((prevStage: StageType): StageType => {
    // First flush the stage
    const newStage = prevStage.map(row =>
      row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] as CellType : cell))
    );
    
    // Draw the tetromino
    player.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          if (
            y + player.pos.y >= 0 && 
            y + player.pos.y < newStage.length && 
            x + player.pos.x >= 0 && 
            x + player.pos.x < newStage[0].length
          ) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
              player.tetrominoColor
            ] as CellType;
          }
        }
      });
    });
    
    // Check for collisions
    if (player.collided) {
      // Check if game over (collision at top)
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        return prevStage;
      }
      
      // Generate new tetromino
      const newTetromino = randomTetromino();
      setPlayer({
        pos: { x: 4, y: 0 },
        tetromino: newTetromino.shape,
        collided: false,
        tetrominoColor: newTetromino.color
      });
      
      // Check if we have filled rows and clear them
      return checkRows(newStage);
    }
    
    return newStage;
  }, [player, checkRows]);

  // Drop tetromino
  const drop = useCallback((): void => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      setPlayer(prev => ({
        ...prev,
        pos: {
          x: prev.pos.x,
          y: prev.pos.y + 1
        }
      }));
    } else {
      // Game over when at the top
      setPlayer(prev => ({
        ...prev,
        collided: true
      }));
    }
  }, [player, stage, checkCollision, rows, level]);

  // Drop faster on down key
  const dropPlayer = (): void => {
    if (paused || gameOver) return;
    drop();
  };

  // Handle key presses
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (gameOver) return;
    
    switch (event.keyCode) {
      case 37: // Left arrow
        movePlayer(-1);
        break;
      case 39: // Right arrow
        movePlayer(1);
        break;
      case 40: // Down arrow
        dropPlayer();
        break;
      case 38: // Up arrow
        rotatePlayer(1);
        break;
      case 32: // Space bar
        togglePause();
        break;
      default:
        break;
    }
  };

  // Set up game interval
  useEffect(() => {
    if (!gameOver && !paused && dropTime !== null) {
      const timer = setInterval(() => {
        drop();
      }, dropTime);
      
      return () => clearInterval(timer);
    }
    return undefined;
  }, [drop, dropTime, gameOver, paused]);
  
  // Update stage as player moves
  useEffect(() => {
    setStage(prev => updateStage(prev));
  }, [player, updateStage]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Tetris Game</h1>
        <p className="text-center text-gray-300 mb-8">Use arrow keys to move and rotate. Space to pause.</p>
        
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-6">
          {/* Game Board */}
          <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">
                {gameOver ? 'Game Over' : (paused ? 'Paused' : 'Playing')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div 
                ref={gameAreaRef}
                role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="grid grid-cols-10 gap-px border border-gray-700 bg-[#111] focus:outline-none"
                style={{ width: '250px', height: '500px' }}
              >
                {stage.map((row, y) => 
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className="w-6 h-6"
                      style={{
                        background: cell[0] === 0 
                          ? 'rgba(20, 20, 20, 0.8)' 
                          : `rgba(${cell[2] || '0, 0, 0'}, 0.8)`,
                        border: cell[0] === 0 ? '1px solid rgba(30, 30, 30, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Game Info and Controls */}
          <Card className="bg-[#1E1E1E]/70 backdrop-blur-sm border-gray-800/60 text-white shadow-lg lg:w-64">
            <CardHeader>
              <CardTitle className="text-green-400">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Score:</span>
                  <span className="text-xl font-bold text-green-400">{score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">High Score:</span>
                  <span className="font-bold text-yellow-400">{highScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Level:</span>
                  <span className="font-bold text-blue-400">{level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Rows:</span>
                  <span className="font-bold text-purple-400">{rows}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  onClick={startGame}
                >
                  {gameOver ? 'New Game' : 'Restart'}
                </button>
                
                {!gameOver && (
                  <button
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    onClick={togglePause}
                  >
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-sm font-bold text-gray-300 mb-2">Controls:</h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>← → : Move left/right</li>
                  <li>↑ : Rotate</li>
                  <li>↓ : Drop faster</li>
                  <li>Space : Pause/Resume</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Touch controls for mobile */}
        <div className="lg:hidden mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <button 
            className="col-start-1 py-4 bg-[#252525] text-white rounded" 
            onClick={() => movePlayer(-1)}
          >
            ←
          </button>
          <button 
            className="col-start-2 py-4 bg-[#252525] text-white rounded" 
            onClick={() => rotatePlayer(1)}
          >
            ↑
          </button>
          <button 
            className="col-start-3 py-4 bg-[#252525] text-white rounded" 
            onClick={() => movePlayer(1)}
          >
            →
          </button>
          <button 
            className="col-start-2 col-span-1 py-4 bg-[#252525] text-white rounded" 
            onClick={dropPlayer}
          >
            ↓
          </button>
        </div>
        
        <div className="mt-8 text-center text-gray-400">
          <p>Created by Suphakin Thiwong</p>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;