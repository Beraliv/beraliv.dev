import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./index.module.css";

export const Layout: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className={styles.layout}>{children}</div>;
};
