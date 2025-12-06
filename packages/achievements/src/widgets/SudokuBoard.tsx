import { createSignal, For, Index, onMount, onCleanup, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import styles from "./SudokuBoard.module.css";
import { createPuzzle, type Difficulty } from "../utils/sudokuGenerator";
import { formatTime } from "../utils/timeFormatter";
import { createSudokuSettings } from "../state/createSudokuSettings";
import { SettingsIcon } from "../components/SettingsIcon";
import { PlayIcon } from "../components/PlayIcon";
import { PauseIcon } from "../components/PauseIcon";

const getPositionIndex = (n: number) => Math.floor(n / 3);

export const SudokuBoard = ({}) => {
  const navigate = useNavigate();
  const {
    difficulty,
    saveDifficulty,
    settingsVisibility,
    saveSettingsVisibility,
    highlightAreas,
    saveHighlightAreas,
    highlightIdenticalNumbers,
    saveHighlightIdenticalNumbers,
    hideUsedNumbers,
    saveHideUsedNumbers,
    highlightDuplicates,
    saveHighlightDuplicates,
  } = createSudokuSettings();
  const [initialPuzzle, setInitialPuzzle] = createSignal(
    createPuzzle(difficulty())
  );
  const [board, setBoard] = createSignal(
    initialPuzzle().map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = createSignal<{
    row: number;
    col: number;
  } | null>(null);

  // Track duplicate cells
  const [duplicateCells, setDuplicateCells] = createSignal<Set<string>>(
    new Set()
  );

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = createSignal(0);
  const [isPaused, setIsPaused] = createSignal(false);
  const [isCompleted, setIsCompleted] = createSignal(false);
  const [completionTime, setCompletionTime] = createSignal(0);
  let intervalId: number | undefined;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
      e.preventDefault();
      handleNumberInput(0);
    } else if (e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      const num = Number(e.key);
      handleNumberInput(num);
    }
  };

  onMount(() => {
    intervalId = window.setInterval(() => {
      if (!isPaused() && !isCompleted()) {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    window.addEventListener("keydown", handleKeydown);
  });

  onCleanup(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
    window.removeEventListener("keydown", handleKeydown);
  });

  const togglePause = () => {
    setIsPaused(!isPaused());
  };

  const isCellMutable = (rowIndex: number, colIndex: number) => {
    return initialPuzzle()[rowIndex][colIndex] === 0;
  };

  const isSameBlock = (rowIndex: number, colIndex: number) => {
    const expectedBlock = `${getPositionIndex(rowIndex)}.${getPositionIndex(
      colIndex
    )}`;
    const actualBlock = `${getPositionIndex(
      selectedCell()?.row ?? -1
    )}.${getPositionIndex(selectedCell()?.col ?? -1)}`;
    return expectedBlock === actualBlock;
  };
  const isSameRow = (rowIndex: number) => selectedCell()?.row === rowIndex;
  const isSameCol = (colIndex: number) => selectedCell()?.col === colIndex;

  const isCellSelected = (rowIndex: number, colIndex: number) => {
    return isSameRow(rowIndex) && isSameCol(colIndex);
  };

  const isCellHighlightedByArea = (rowIndex: number, colIndex: number) => {
    return (
      isSameRow(rowIndex) ||
      isSameCol(colIndex) ||
      isSameBlock(rowIndex, colIndex)
    );
  };

  const isSameNumberSelected = (rowIndex: number, colIndex: number) => {
    const actualNumber = board()[rowIndex][colIndex];
    const expectedNumber = selectedCell()
      ? board()[selectedCell()!.row][selectedCell()!.col]
      : -1;
    return actualNumber === expectedNumber && expectedNumber !== 0;
  };

  const isCellDuplicate = (rowIndex: number, colIndex: number) => {
    return duplicateCells().has(`${rowIndex},${colIndex}`);
  };

  const isNumberUsed = (num: number) => {
    return (
      board()
        .flat()
        .filter((value) => value === num).length === 9
    );
  };

  const checkForDuplicates = () => {
    const duplicates = new Set<string>();
    const currentBoard = board();

    // Check each cell for duplicates
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = currentBoard[row][col];
        if (value === 0) continue;

        // Check row for duplicates
        for (let c = 0; c < 9; c++) {
          if (c !== col && currentBoard[row][c] === value) {
            duplicates.add(`${row},${col}`);
            duplicates.add(`${row},${c}`);
          }
        }

        // Check column for duplicates
        for (let r = 0; r < 9; r++) {
          if (r !== row && currentBoard[r][col] === value) {
            duplicates.add(`${row},${col}`);
            duplicates.add(`${r},${col}`);
          }
        }

        // Check 3x3 block for duplicates
        const blockRow = getPositionIndex(row);
        const blockCol = getPositionIndex(col);
        for (let r = blockRow * 3; r < blockRow * 3 + 3; r++) {
          for (let c = blockCol * 3; c < blockCol * 3 + 3; c++) {
            if ((r !== row || c !== col) && currentBoard[r][c] === value) {
              duplicates.add(`${row},${col}`);
              duplicates.add(`${r},${c}`);
            }
          }
        }
      }
    }

    setDuplicateCells(duplicates);
  };

  const checkVictory = () => {
    const currentBoard = board();

    // Check if all cells are filled
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) return false;
      }
    }

    // Check if there are no duplicates
    if (duplicateCells().size > 0) return false;

    return true;
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleCellClick = (row: number, col: number) => {
    if (isPaused()) return;
    setSelectedCell({ row, col });
  };

  const toggleSettingsVisibility = () => {
    const newVisibility = !settingsVisibility();
    saveSettingsVisibility(newVisibility);
  };

  const handleNumberInput = (num: number) => {
    if (isPaused() || isCompleted()) return;
    const selected = selectedCell();
    if (selected) {
      const newBoard = board().map((row) => [...row]);
      newBoard[selected.row][selected.col] = num;
      setBoard(newBoard);
      checkForDuplicates();

      if (checkVictory()) {
        setIsCompleted(true);
        setCompletionTime(elapsedSeconds());
      }
    }
  };

  const handleClear = () => {
    if (isPaused()) return;
    const selected = selectedCell();
    if (selected) {
      const newBoard = board().map((row) => [...row]);
      newBoard[selected.row][selected.col] = 0;
      setBoard(newBoard);
      checkForDuplicates();
    }
  };

  const handleNewGame = () => {
    const newPuzzle = createPuzzle(difficulty());
    setInitialPuzzle(newPuzzle);
    setBoard(newPuzzle.map((row) => [...row]));
    setSelectedCell(null);
    setElapsedSeconds(0);
    setIsPaused(false);
    setIsCompleted(false);
    setCompletionTime(0);
    setDuplicateCells(new Set<string>());
  };

  return (
    <div class={styles.sudokuContainer}>
      <div class={styles.header}>
        <h2>Sudoku</h2>
        <div class={styles.headerButtons}>
          <span class={styles.timer}>{formatTime(elapsedSeconds())}</span>
          <button
            class={styles.playPauseButton}
            onClick={togglePause}
            onTouchEnd={(e) => {
              e.preventDefault();
              togglePause();
            }}
            aria-label={isPaused() ? "Play" : "Pause"}
          >
            {isPaused() ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button
            class={styles.settingsButton}
            onClick={toggleSettingsVisibility}
            onTouchEnd={(e) => {
              e.preventDefault();
              toggleSettingsVisibility();
            }}
            aria-label="Settings"
          >
            <SettingsIcon />
          </button>
          <button
            class={styles.closeButton}
            onClick={handleClose}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {settingsVisibility() && (
        <div class={styles.settingsPanel}>
          <div class={styles.settingItem}>
            <label class={styles.settingLabel}>
              <span>Difficulty:</span>
              <select
                class={styles.difficultySelect}
                value={difficulty()}
                onChange={(e) => {
                  const newDifficulty = e.currentTarget.value as Difficulty;
                  saveDifficulty(newDifficulty);
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
                <option value="master">Master</option>
                <option value="extreme">Extreme</option>
              </select>
            </label>
            <label class={styles.settingLabel}>
              <input
                type="checkbox"
                checked={highlightAreas()}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  saveHighlightAreas(value);
                }}
                class={styles.checkbox}
              />
              <span>Highlight areas</span>
            </label>
            <label class={styles.settingLabel}>
              <input
                type="checkbox"
                checked={highlightIdenticalNumbers()}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  saveHighlightIdenticalNumbers(value);
                }}
                class={styles.checkbox}
              />
              <span>Highlight identical numbers</span>
            </label>
            <label class={styles.settingLabel}>
              <input
                type="checkbox"
                checked={hideUsedNumbers()}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  saveHideUsedNumbers(value);
                }}
                class={styles.checkbox}
              />
              <span>Hide used numbers</span>
            </label>
            <label class={styles.settingLabel}>
              <input
                type="checkbox"
                checked={highlightDuplicates()}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  saveHighlightDuplicates(value);
                }}
                class={styles.checkbox}
              />
              <span>Highlight duplicates</span>
            </label>
          </div>
        </div>
      )}

      <div class={styles.boardContainer}>
        <div class={styles.boardWrapper}>
          <div
            class={styles.board}
            classList={{ [styles.boardPaused]: isPaused() || isCompleted() }}
          >
            <Index each={board()}>
              {(row, rowIndex) => (
                <Index each={row()}>
                  {(cell, colIndex) => {
                    return (
                      <button
                        class={styles.cell}
                        classList={{
                          [styles.cellMutable]: isCellMutable(
                            rowIndex,
                            colIndex
                          ),
                          [styles.cellSelected]:
                            !isPaused() &&
                            !isCompleted() &&
                            isCellSelected(rowIndex, colIndex),
                          [styles.cellHighlightedByArea]:
                            !isPaused() &&
                            !isCompleted() &&
                            isCellHighlightedByArea(rowIndex, colIndex) &&
                            highlightAreas(),
                          [styles.cellHighlightedByIdenticalSelectedNumber]:
                            !isPaused() &&
                            !isCompleted() &&
                            isSameNumberSelected(rowIndex, colIndex) &&
                            highlightIdenticalNumbers(),
                          [styles.cellDuplicate]:
                            !isPaused() &&
                            !isCompleted() &&
                            isCellDuplicate(rowIndex, colIndex) &&
                            highlightDuplicates(),
                        }}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          handleCellClick(rowIndex, colIndex);
                        }}
                      >
                        {isPaused() || isCompleted()
                          ? ""
                          : cell() !== 0
                          ? cell()
                          : ""}
                      </button>
                    );
                  }}
                </Index>
              )}
            </Index>
          </div>

          <Show when={isCompleted()}>
            <div class={styles.victoryMessage}>
              <h2>Congrats!</h2>
              <p class={styles.completionTime}>
                Completed in {formatTime(completionTime())}
              </p>
            </div>
          </Show>
        </div>

        <div
          class={styles.controls}
          classList={{ [styles.controlsDisabled]: isPaused() }}
        >
          <div class={styles.numberPad}>
            <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9]}>
              {(num) => (
                <button
                  classList={{
                    [styles.numberButton]: true,
                    [styles.numberButtonDisabled]:
                      isNumberUsed(num) && hideUsedNumbers(),
                  }}
                  onClick={() => handleNumberInput(num)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleNumberInput(num);
                  }}
                  disabled={isPaused() || isCompleted()}
                >
                  {isNumberUsed(num) && hideUsedNumbers() ? "" : num}
                </button>
              )}
            </For>
          </div>
          <div class={styles.actionButtons}>
            <button
              class={styles.clearButton}
              onClick={handleClear}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleClear();
              }}
              disabled={isPaused() || isCompleted()}
            >
              Clear
            </button>
            <button
              class={styles.newGameButton}
              onClick={handleNewGame}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleNewGame();
              }}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
