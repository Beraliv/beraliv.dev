import styles from "./index.module.css";

interface SnowPropsType {
  number: number;
}

export const Snow = ({ number }: SnowPropsType) => {
  const snowflakes = Array(number)
    .fill(0)
    .map((_, index) => <div key={index} className={styles.snowflake} />);

  return <div className={styles.snow}>{snowflakes}</div>;
};
