import { Component } from "solid-js";

const PlusIcon: Component = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="32px"
    height="32px"
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
  >
    <g>
      <line
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        x1="32"
        y1="50"
        x2="32"
        y2="14"
      />
      <line
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        x1="14"
        y1="32"
        x2="50"
        y2="32"
      />
    </g>
    <g>
      <circle
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        cx="32"
        cy="32"
        r="30.999"
      />
    </g>
  </svg>
);

export { PlusIcon };
