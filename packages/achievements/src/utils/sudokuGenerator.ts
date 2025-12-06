export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master' | 'extreme';

export const DIFFICULTY_CLUES: Record<Difficulty, number> = {
  easy: 45,      // 45 clues (36 empty)
  medium: 35,    // 35 clues (46 empty)
  hard: 30,      // 30 clues (51 empty)
  expert: 25,    // 25 clues (56 empty)
  master: 22,    // 22 clues (59 empty)
  extreme: 20,   // 20 clues (61 empty)
};

const getPositionIndex = (n: number) => Math.floor(n / 3);

// Check if a number is valid in a given position
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }

  // Check 3x3 block
  const blockRow = getPositionIndex(row) * 3;
  const blockCol = getPositionIndex(col) * 3;
  for (let r = blockRow; r < blockRow + 3; r++) {
    for (let c = blockCol; c < blockCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
};

// Solve Sudoku using backtracking
const solveSudoku = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle for randomness
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Generate a complete solved Sudoku board
const generateSolvedBoard = (): number[][] => {
  const board = Array(9).fill(0).map(() => Array(9).fill(0));
  solveSudoku(board);
  return board;
};

// Change it during testing to generate almost completed puzzles
const testingSummary = false;

// Remove numbers to create puzzle with unique solution
export const createPuzzle = (difficulty: Difficulty): number[][] => {
  const solution = generateSolvedBoard();
  const puzzle = solution.map(row => [...row]);

  const targetClues = testingSummary ? 80 : DIFFICULTY_CLUES[difficulty];
  const cellsToRemove = 81 - targetClues;

  let removed = 0;
  const attempts = new Set<string>();

  while (removed < cellsToRemove && attempts.size < 81) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const key = `${row},${col}`;

    if (attempts.has(key)) continue;
    attempts.add(key);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
};
