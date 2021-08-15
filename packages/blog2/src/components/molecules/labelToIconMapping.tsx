import React from "react";
import { LabelType } from "../../types/LabelType";
import { CSSIcon } from "../atoms/CSSIcon";
import { JavaScriptIcon } from "../atoms/JavaScriptIcon";
import { TypeScriptIcon } from "../atoms/TypeScriptIcon";
import { VideoPlayerIcon } from "../atoms/VideoPlayerIcon";

export const labelToIconMapping: Record<LabelType, JSX.Element> = {
  css: <CSSIcon />,
  javascript: <JavaScriptIcon />,
  player: <VideoPlayerIcon />,
  typescript: <TypeScriptIcon />,
};
