import React from "react";
import { LabelType } from "../../types/LabelType";
import { CSSIcon } from "../atoms/CSSIcon";
import { JavaScriptIcon } from "../atoms/JavaScriptIcon";
import { TypeScriptIcon } from "../atoms/TypeScriptIcon";
import { VideoPlayerIcon } from "../atoms/VideoPlayerIcon";
import { PersonalIcon } from "../atoms/PersonalIcon";

/**
 * @deprecated not used anymore
 */
export const labelToIconMapping: Record<LabelType, JSX.Element | null> = {
  css: <CSSIcon />,
  javascript: <JavaScriptIcon />,
  personal: <PersonalIcon />,
  player: <VideoPlayerIcon />,
  typescript: <TypeScriptIcon />,
};
