import { Component } from "solid-js";
import { TColor } from "../../../types/TColor";
import { cx } from "../../../utils/cx";

import style from "./index.module.css";

interface IColorProps {
  color: TColor;
  handleClick: (color: TColor) => void;
}

const Color: Component<IColorProps> = ({ color, handleClick }) => (
  <div class={cx(style.color, color)} onClick={() => handleClick(color)}></div>
);

export { Color };
