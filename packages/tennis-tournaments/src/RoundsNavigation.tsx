import { Accessor, Component, For, Show } from "solid-js";

import styles from "./RoundsNavigation.module.css";

import FinalIcon from "./Icons/Final.svg";
import HalfRoundOf64Icon from "./Icons/HalfRoundOf64.svg";
import QuarterRoundOf128Icon from "./Icons/QuarterRoundOf128.svg";
import QuarterfinalsIcon from "./Icons/Quarterfinals.svg";
import RoundOf16Icon from "./Icons/RoundOf16.svg";
import RoundOf32Icon from "./Icons/RoundOf32.svg";
import SemifinalsIcon from "./Icons/Semifinals.svg";
import { CourtType } from "./Types/CourtType";
import { RoundApiModel } from "./Types/RoundApiModel";
import { RoundsApiModel } from "./Types/RoundsApiModel";
import { classNames } from "./Utils/classNames";
import { isDefined } from "./Utils/isDefined";
import { roundEquals } from "./Utils/roundEquals";

interface RoundsNavigationProps {
  roundsApiModel: Accessor<RoundsApiModel>;
  onRoundChange: (name: string) => void;
  courtType: CourtType;
}

const ORDERED_ICONS: Component[] = [
  () => (
    <div class={classNames(styles.Round, styles.RoundOf128)}>
      <QuarterRoundOf128Icon />
      <QuarterRoundOf128Icon />
      <QuarterRoundOf128Icon />
      <QuarterRoundOf128Icon />
    </div>
  ),
  () => (
    <div class={classNames(styles.Round, styles.RoundOf64)}>
      <HalfRoundOf64Icon />
      <HalfRoundOf64Icon />
    </div>
  ),
  () => <RoundOf32Icon />,
  () => <RoundOf16Icon />,
  () => <QuarterfinalsIcon />,
  () => <SemifinalsIcon />,
  () => <FinalIcon />,
];

const alignRoundsAndIcons = (rounds: RoundApiModel[]) => {
  const icons: Component[] = [];

  for (let i = 0; i < rounds.length; i++) {
    const icon = ORDERED_ICONS[Math.max(0, ORDERED_ICONS.length - 1 - i)];
    icons.unshift(icon);
  }

  return icons;
};

const RoundsNavigation: Component<RoundsNavigationProps> = ({
  roundsApiModel,
  onRoundChange,
  courtType,
}) => {
  const icons = alignRoundsAndIcons(roundsApiModel().rounds);

  return (
    <div class={styles.RoundsNavigation}>
      <For each={roundsApiModel().rounds}>
        {(round, index) => (
          <div
            class={classNames(`${round.slug}-${round.id}`, styles.Round, {
              [styles.SelectedRound]: (() => {
                const currentRound = roundsApiModel().currentRound;

                return (
                  isDefined(currentRound) && roundEquals(currentRound, round)
                );
              })(),
              [styles.clay]: courtType === "clay",
              [styles.grass]: courtType === "grass",
              [styles.hard]: courtType === "hard",
            })}
            onClick={() => onRoundChange(round.name)}
          >
            <div class={styles.Name}>{round.name}</div>
            <Show when={icons[index()]}>{(icon) => icon()({})}</Show>
          </div>
        )}
      </For>
    </div>
  );
};

export { RoundsNavigation };
