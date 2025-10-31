import styles from "./index.module.css";

export const MdxTable = (props: { children: React.ReactNode }) => (
  <div className={styles.container}>
    <table>{props.children}</table>
  </div>
);
