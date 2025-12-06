import { createSignal, For, Index, onMount, onCleanup, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import styles from "./SudokuBoard.module.css";
import { createPuzzle, type Difficulty } from "../utils/sudokuGenerator";

const getPositionIndex = (n: number) => Math.floor(n / 3);

const STORAGE_KEYS = {
  HIGHLIGHT_AREAS: "sudoku_highlight_areas",
  HIGHLIGHT_IDENTICAL_NUMBERS: "sudoku_highlight_identical_numbers",
  HIDE_USED_NUMBERS: "sudoku_hide_used_numbers",
  HIGHLIGHT_DUPLICATES: "sudoku_highlight_duplicates",
  SETTINGS_VISIBILITY: "sudoku_settings_visibility",
  DIFFICULTY: "sudoku_difficulty",
} as const;

const loadBooleanSetting = (
  key: string,
  defaultValue: boolean = false
): boolean => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored === "true" : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveBooleanSetting = (key: string, value: boolean): void => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

const loadDifficulty = (): Difficulty => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
    if (
      stored &&
      ["easy", "medium", "hard", "expert", "master", "extreme"].includes(stored)
    ) {
      return stored as Difficulty;
    }
  } catch {
    // Fall through to default
  }
  return "medium";
};

const saveDifficulty = (difficulty: Difficulty): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DIFFICULTY, difficulty);
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const SudokuBoard = ({}) => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = createSignal<Difficulty>(
    loadDifficulty()
  );
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

  // Settings
  // 1. Settings visibility to the user
  const [settingsVisibility, setSettingsVisibility] = createSignal(
    loadBooleanSetting(STORAGE_KEYS.SETTINGS_VISIBILITY)
  );
  // 2. Highlight the block, column and row for a selected cell
  const [highlightAreas, setHighlightAreas] = createSignal(
    loadBooleanSetting(STORAGE_KEYS.HIGHLIGHT_AREAS)
  );
  // 3. Highlight identical numbers
  const [highlightIdenticalNumbers, setHighlightIdenticalNumbers] =
    createSignal(loadBooleanSetting(STORAGE_KEYS.HIGHLIGHT_IDENTICAL_NUMBERS));
  // 4. Hide used numbers on number pad
  const [hideUsedNumbers, setHideUsedNumbers] = createSignal(
    loadBooleanSetting(STORAGE_KEYS.HIDE_USED_NUMBERS)
  );
  // 5. Highlight duplicates
  const [highlightDuplicates, setHighlightDuplicates] = createSignal(
    loadBooleanSetting(STORAGE_KEYS.HIGHLIGHT_DUPLICATES)
  );

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
    const newValue = !settingsVisibility();
    setSettingsVisibility(newValue);
    saveBooleanSetting(STORAGE_KEYS.SETTINGS_VISIBILITY, newValue);
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
            {isPaused() ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0717 13.3005C16.1209 13.5708 16.2501 13.8203 16.4417 14.0167L16.4917 14.0667C16.6464 14.2211 16.7692 14.4047 16.8531 14.6071C16.937 14.8095 16.9804 15.0267 16.9804 15.2458C16.9804 15.465 16.937 15.6822 16.8531 15.8846C16.7692 16.087 16.6464 16.2706 16.4917 16.425C16.3373 16.5797 16.1537 16.7025 15.9513 16.7864C15.7489 16.8703 15.5317 16.9137 15.3125 16.9137C15.0933 16.9137 14.8761 16.8703 14.6737 16.7864C14.4713 16.7025 14.2877 16.5797 14.1333 16.425L14.0833 16.375C13.887 16.1834 13.6374 16.0542 13.3671 16.0051C13.0968 15.9559 12.8179 15.989 12.5667 16.1C12.3203 16.2056 12.1099 16.3795 11.9608 16.6016C11.8116 16.8238 11.7301 17.0848 11.725 17.3533V17.5C11.725 17.9421 11.5494 18.3659 11.2368 18.6785C10.9241 18.9911 10.5004 19.1667 10.0583 19.1667C9.61623 19.1667 9.19245 18.9911 8.87989 18.6785C8.56733 18.3659 8.39167 17.9421 8.39167 17.5V17.425C8.38116 17.1482 8.29145 16.8803 8.13327 16.6533C7.97509 16.4264 7.75524 16.2498 7.5 16.1433C7.24875 16.0323 6.96987 15.9992 6.69956 16.0484C6.42926 16.0975 6.17974 16.2267 5.98333 16.4183L5.93333 16.4683C5.77895 16.623 5.59534 16.7458 5.39294 16.8297C5.19054 16.9136 4.97331 16.957 4.75417 16.957C4.53503 16.957 4.3178 16.9136 4.1154 16.8297C3.913 16.7458 3.72939 16.623 3.575 16.4683C3.42032 16.314 3.29753 16.1303 3.21363 15.9279C3.12973 15.7255 3.08632 15.5083 3.08632 15.2892C3.08632 15.07 3.12973 14.8528 3.21363 14.6504C3.29753 14.448 3.42032 14.2644 3.575 14.11L3.625 14.06C3.81659 13.8636 3.94583 13.614 3.99498 13.3437C4.04413 13.0734 4.01101 12.7946 3.9 12.5433C3.79441 12.297 3.62053 12.0866 3.39838 11.9374C3.17624 11.7883 2.9152 11.7068 2.64667 11.7017H2.5C2.05797 11.7017 1.63419 11.526 1.32163 11.2135C1.00907 10.9009 0.833334 10.4771 0.833334 10.035C0.833334 9.59296 1.00907 9.16918 1.32163 8.85662C1.63419 8.54406 2.05797 8.36833 2.5 8.36833H2.575C2.85184 8.35782 3.11973 8.26811 3.34667 8.10993C3.57362 7.95175 3.75017 7.7319 3.85667 7.47667C3.96768 7.22542 4.00079 6.94654 3.95165 6.67623C3.9025 6.40593 3.77326 6.15641 3.58167 5.96L3.53167 5.91C3.37699 5.75561 3.2542 5.572 3.1703 5.3696C3.0864 5.1672 3.04299 4.94997 3.04299 4.73083C3.04299 4.51169 3.0864 4.29446 3.1703 4.09206C3.2542 3.88966 3.37699 3.70606 3.53167 3.55167C3.68606 3.39699 3.86966 3.2742 4.07206 3.1903C4.27446 3.1064 4.49169 3.06299 4.71083 3.06299C4.92997 3.06299 5.1472 3.1064 5.3496 3.1903C5.552 3.2742 5.73561 3.39699 5.89 3.55167L5.94 3.60167C6.13641 3.79326 6.38593 3.9225 6.65623 3.97165C6.92654 4.02079 7.20542 3.98768 7.45667 3.87667H7.5C7.74632 3.77108 7.9567 3.5972 8.10584 3.37505C8.25499 3.15291 8.33649 2.89187 8.34167 2.62333V2.5C8.34167 2.05797 8.51733 1.63419 8.82989 1.32163C9.14245 1.00907 9.56623 0.833334 10.0083 0.833334C10.4504 0.833334 10.8741 1.00907 11.1867 1.32163C11.4993 1.63419 11.675 2.05797 11.675 2.5V2.575C11.6802 2.84354 11.7617 3.10458 11.9108 3.32672C12.06 3.54887 12.2703 3.72275 12.5167 3.82833C12.7679 3.93935 13.0468 3.97246 13.3171 3.92331C13.5874 3.87417 13.837 3.74492 14.0333 3.55333L14.0833 3.50333C14.2377 3.34865 14.4213 3.22587 14.6237 3.14197C14.8261 3.05806 15.0433 3.01465 15.2625 3.01465C15.4816 3.01465 15.6989 3.05806 15.9013 3.14197C16.1037 3.22587 16.2873 3.34865 16.4417 3.50333C16.5963 3.65772 16.7191 3.84133 16.803 4.04373C16.8869 4.24613 16.9303 4.46336 16.9303 4.6825C16.9303 4.90164 16.8869 5.11887 16.803 5.32127C16.7191 5.52367 16.5963 5.70728 16.4417 5.86167L16.3917 5.91167C16.2001 6.10807 16.0708 6.3576 16.0217 6.6279C15.9726 6.89821 16.0057 7.17709 16.1167 7.42833V7.5C16.2222 7.74632 16.3961 7.9567 16.6183 8.10584C16.8404 8.25499 17.1015 8.33649 17.37 8.34167H17.5C17.9421 8.34167 18.3659 8.51733 18.6785 8.82989C18.9911 9.14245 19.1667 9.56623 19.1667 10.0083C19.1667 10.4504 18.9911 10.8741 18.6785 11.1867C18.3659 11.4993 17.9421 11.675 17.5 11.675H17.425C17.1565 11.6802 16.8954 11.7617 16.6733 11.9108C16.4511 12.06 16.2773 12.2703 16.1717 12.5167L16.1667 12.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
                  setDifficulty(newDifficulty);
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
                  setHighlightAreas(value);
                  saveBooleanSetting(STORAGE_KEYS.HIGHLIGHT_AREAS, value);
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
                  setHighlightIdenticalNumbers(value);
                  saveBooleanSetting(
                    STORAGE_KEYS.HIGHLIGHT_IDENTICAL_NUMBERS,
                    value
                  );
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
                  setHideUsedNumbers(value);
                  saveBooleanSetting(STORAGE_KEYS.HIDE_USED_NUMBERS, value);
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
                  setHighlightDuplicates(value);
                  saveBooleanSetting(STORAGE_KEYS.HIGHLIGHT_DUPLICATES, value);
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
