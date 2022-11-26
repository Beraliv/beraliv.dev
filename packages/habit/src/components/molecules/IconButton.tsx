import { Component } from "solid-js";
import { RightChevronIcon } from "../atoms/RightChevronIcon";

import styles from "./IconButton.module.css";

interface IIconButtonProps {
  handleClick: () => void;
}

const IconButton: Component<IIconButtonProps> = ({ handleClick }) => (
  <fieldset class={styles.fieldset} onClick={handleClick}>
    <div class={styles.text}>Icon</div>
    <RightChevronIcon />
  </fieldset>
);

export { IconButton };
