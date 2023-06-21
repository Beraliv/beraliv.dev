import { Component, Signal } from "solid-js";
import { TColor } from "../../types/TColor";
import { cx } from "../../utils/cx";

import style from "./PickColor.module.css";

interface IPickColorProps {
  type: TColor;
  signal: Signal<TColor>;
}

const PickColor: Component<IPickColorProps> = ({
  type: color,
  signal: [currentColor, handleClick],
}) => {
  return (
    <div
      class={cx(style.color, color, {
        [style.selected]: color === currentColor(),
      })}
      onClick={() => handleClick(color)}
    ></div>
  );
};

export { PickColor };
