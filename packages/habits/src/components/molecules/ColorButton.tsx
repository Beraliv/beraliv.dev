import { Component, Signal } from "solid-js";
import { TColor } from "../../types/TColor";
import { cx } from "../../utils/cx";
import { RightChevronIcon } from "../atoms/RightChevronIcon";

import styles from "./ColorButton.module.css";

interface IColorButtonProps {
  handleClick: () => void;
  colorSignal: Signal<TColor>;
}

const ColorButton: Component<IColorButtonProps> = ({
  handleClick,
  colorSignal: [color],
}) => (
  <fieldset class={styles.fieldset} onClick={handleClick}>
    <div class={styles.text}>Color</div>
    <span class={cx(styles.color, color())} />
    <RightChevronIcon />
  </fieldset>
);

export { ColorButton };
