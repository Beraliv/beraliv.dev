import { Component } from "solid-js";
import { HandsBubblesIcon } from "../components/atoms/HandsBubblesIcon";
import { LanguageIcon } from "../components/atoms/LanguageIcon";
import { FaceSmileIcon } from "../components/atoms/FaceSmileIcon";
import { TIconType } from "../types/TIconType";
import { PawIcon } from "../components/atoms/PawIcon";
import { PersonRunningIcon } from "../components/atoms/PersonRunningIcon";
import { HeartPulseIcon } from "../components/atoms/HeartPulseIcon";
import { IIconProps } from "../interfaces/IIconProps";

const ICON_MAPPING: Record<TIconType, Component<IIconProps>> = {
  handsBubbles: HandsBubblesIcon,
  language: LanguageIcon,
  paw: PawIcon,
  heartPulse: HeartPulseIcon,
  personRunning: PersonRunningIcon,
  faceSmile: FaceSmileIcon,
};

export { ICON_MAPPING };
