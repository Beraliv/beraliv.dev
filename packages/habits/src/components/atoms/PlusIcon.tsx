import { Component } from "solid-js";
import { IIconProps } from "../../interfaces/IIconProps";

import styles from "./PlusIcon.module.css";

const PlusIcon: Component<IIconProps> = ({
  width = 18,
  height = 18,
  fill = "none",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={styles.icon}
    width={width}
    height={height}
    fill={fill}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export { PlusIcon };
