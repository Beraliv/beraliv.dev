import { Component, Signal } from "solid-js";
import { ICON_MAPPING } from "../../const/ICON_MAPPING";
import { TIconType } from "../../types/TIconType";
import { cx } from "../../utils/cx";

import style from "./PickIcon.module.css";

interface IPickIconProps {
  type: TIconType;
  signal: Signal<TIconType>;
}

const PickIcon: Component<IPickIconProps> = ({
  type: icon,
  signal: [currentIcon, handleClick],
}) => {
  return (
    <div
      class={cx(style.icon, {
        [style.selected]: icon === currentIcon(),
      })}
      onClick={() => handleClick(icon)}
    >
      {ICON_MAPPING[icon]({})}
    </div>
  );
};

export { PickIcon };
