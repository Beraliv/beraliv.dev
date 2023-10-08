import { Component } from "solid-js";
import styles from "./Loading.module.css";
import LoadingIcon from "./Icons/Loading.svg";

const Loading: Component = () => (
  <div class={styles.Loading}>
    <LoadingIcon />
  </div>
);

export { Loading };
