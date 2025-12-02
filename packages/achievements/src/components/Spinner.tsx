import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div class={styles.spinner}>
      <div class={styles.spinnerCircle}></div>
    </div>
  );
};
