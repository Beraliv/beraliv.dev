import { Accessor, Component, For, Setter } from "solid-js";

import styles from "./RoundsNavigation.module.css";
import { RoundsApiModel } from "./Types/RoundsApiModel";
import FinalIcon from "./Icons/Final.svg";
import SemifinalsIcon from "./Icons/Semifinals.svg";
import Quarterfinals from "./Icons/Quarterfinals.svg";
import Round4 from "./Icons/Round4.svg";
import Round3 from "./Icons/Round3.svg";
import Round2 from "./Icons/Round2.svg";
import Round1 from "./Icons/Round1.svg";
import { classNames } from "./Utils/classNames";
import { RoundApiModel } from "./Types/RoundApiModel";
import { roundEquals } from "./Utils/roundEquals";
import { isDefined } from "./Utils/isDefined";

interface RoundsNavigationProps {
  roundsApiModel: Accessor<RoundsApiModel>;
  mutateRoundsApiModel: Setter<RoundApiModel | undefined>;
}

const OrderedIcons: Component[] = [
  () => (
    <div class={styles.Round}>
      <Round1 />
      <Round1 />
      <Round1 />
      <Round1 />
    </div>
  ),
  () => (
    <div class={styles.Round}>
      <Round2 />
      <Round2 />
    </div>
  ),
  () => <Round3 />,
  () => <Round4 />,
  () => <Quarterfinals />,
  () => <SemifinalsIcon />,
  () => <FinalIcon />,
];

const alignRoundsAndIcons = (rounds: RoundApiModel[]) => {
  const AlignedIcons = [];

  for (let i = 0; i < rounds.length; i++) {
    const Icon = OrderedIcons[Math.max(0, OrderedIcons.length - 1 - i)];
    AlignedIcons.unshift(Icon);
  }

  return AlignedIcons;
};

const RoundsNavigation: Component<RoundsNavigationProps> = ({
  roundsApiModel,
  mutateRoundsApiModel,
}) => {
  const AlignedIcons = alignRoundsAndIcons(roundsApiModel().rounds);

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
            })}
            onClick={() => {
              mutateRoundsApiModel((prev) => {
                if (prev === undefined) {
                  return undefined;
                }

                return {
                  ...prev,
                  currentRound: round,
                };
              });
            }}
          >
            {round.name}
            {AlignedIcons[index()]({})}
          </div>
        )}
      </For>
    </div>
  );
};

export { RoundsNavigation };
