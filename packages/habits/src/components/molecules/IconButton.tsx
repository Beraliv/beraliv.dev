import { Component, Signal } from "solid-js";
import { ICON_MAPPING } from "../../const/ICON_MAPPING";
import { TIconType } from "../../types/TIconType";
import { RightChevronIcon } from "../atoms/RightChevronIcon";

import styles from "./IconButton.module.css";

interface IIconButtonProps {
  handleClick: () => void;
  iconSignal: Signal<TIconType>;
}

const IconButton: Component<IIconButtonProps> = ({
  handleClick,
  iconSignal: [icon],
}) => (
  <fieldset class={styles.fieldset} onClick={handleClick}>
    <div class={styles.text}>Icon</div>
    {ICON_MAPPING[icon()]({ width: 16, height: 16 })}
    <RightChevronIcon />
  </fieldset>
);

export { IconButton };
