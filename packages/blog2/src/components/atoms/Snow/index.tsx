import styles from "./index.module.css";

interface SnowPropsType {
  number: number;
}

export const Snow = ({ number }: SnowPropsType) => {
  const snowflakes = Array(number)
    .fill(0)
    .map(() => (
      // eslint-disable-next-line react/jsx-key
      <div className={styles.snowflake} />
    ));

  return <>{snowflakes}</>;
};
