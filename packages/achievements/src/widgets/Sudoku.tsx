import { useNavigate } from "@solidjs/router";
import styles from "./Sudoku.module.css";

export const Sudoku = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/sudoku");
  };

  return (
    <div class={styles.sudokuWidget}>
      <button
        class={styles.sudokuButton}
        onClick={handlePlay}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePlay();
        }}
      >
        <div class={styles.header}>
          <span>Sudoku</span>
        </div>
        <div class={styles.playButton}>
          <svg
            class={styles.playIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    </div>
  );
};
