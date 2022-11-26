import { Component, Signal } from "solid-js";
import { TColor } from "../../../types/TColor";
import { cx } from "../../../utils/cx";

import style from "./index.module.css";

interface IColorProps {
  color: TColor;
  colorSignal: Signal<TColor>;
}

const Color: Component<IColorProps> = ({
  color,
  colorSignal: [currentColor, handleClick],
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

export { Color };
