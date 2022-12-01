import { Component } from "solid-js";
import { IIconProps } from "../../interfaces/IIconProps";

const RightChevronIcon: Component<IIconProps> = ({
  width = 13,
  height = 13,
  fill = "white",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={width}
    height={height}
    fill={fill}
    {...props}
  >
    <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
  </svg>
);

export { RightChevronIcon };
