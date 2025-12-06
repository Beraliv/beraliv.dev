import { createSignal } from "solid-js";
import {
  loadBooleanSetting,
  loadStringSetting,
  saveBooleanSetting,
  saveStringSetting,
} from "../utils/localStorage";
import { type Difficulty } from "../utils/sudokuGenerator";

const STORAGE_KEYS = {
  HIGHLIGHT_AREAS: "sudoku_highlight_areas",
  HIGHLIGHT_IDENTICAL_NUMBERS: "sudoku_highlight_identical_numbers",
  HIDE_USED_NUMBERS: "sudoku_hide_used_numbers",
  HIGHLIGHT_DUPLICATES: "sudoku_highlight_duplicates",
  SETTINGS_VISIBILITY: "sudoku_settings_visibility",
  DIFFICULTY: "sudoku_difficulty",
} as const;

const loadDifficulty = (): Difficulty => {
  const stored = loadStringSetting(STORAGE_KEYS.DIFFICULTY, "easy");
  if (
    ["easy", "medium", "hard", "expert", "master", "extreme"].includes(stored)
  ) {
    return stored as Difficulty;
  }
  return "medium";
};

export const createSudokuSettings = () => {
  // 0. Difficulty of the sudoku puzzle
  const [difficulty, setDifficulty] = createSignal<Difficulty>(
    loadDifficulty()
  );
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

  const saveDifficulty = (difficulty: Difficulty): void => {
    setDifficulty(difficulty);
    saveStringSetting(STORAGE_KEYS.DIFFICULTY, difficulty);
  };

  const saveSettingsVisibility = (visibility: boolean): void => {
    setSettingsVisibility(visibility);
    saveBooleanSetting(STORAGE_KEYS.SETTINGS_VISIBILITY, visibility);
  };

  const saveHighlightAreas = (value: boolean): void => {
    setHighlightAreas(value);
    saveBooleanSetting(STORAGE_KEYS.HIGHLIGHT_AREAS, value);
  };

  const saveHighlightIdenticalNumbers = (value: boolean): void => {
    setHighlightIdenticalNumbers(value);
    saveBooleanSetting(STORAGE_KEYS.HIGHLIGHT_IDENTICAL_NUMBERS, value);
  };

  const saveHideUsedNumbers = (value: boolean): void => {
    setHideUsedNumbers(value);
    saveBooleanSetting(STORAGE_KEYS.HIDE_USED_NUMBERS, value);
  };

  const saveHighlightDuplicates = (value: boolean): void => {
    setHighlightDuplicates(value);
    saveBooleanSetting(STORAGE_KEYS.HIGHLIGHT_DUPLICATES, value);
  };

  return {
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
  };
};
