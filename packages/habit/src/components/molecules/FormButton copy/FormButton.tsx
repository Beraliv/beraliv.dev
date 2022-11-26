import { Component } from "solid-js";
import { RightChevronIcon } from "../../atoms/RightChevronIcon";

import styles from "./FormButton.module.css";

interface IFormButtonProps {
  text: string;
  handleClick: () => void;
}

const FormButton: Component<IFormButtonProps> = ({ handleClick, text }) => (
  <fieldset class={styles.fieldset} onClick={handleClick}>
    <div class={styles.text}>{text}</div>
    <RightChevronIcon />
  </fieldset>
);

export { FormButton };
