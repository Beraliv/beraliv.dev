import { Component, Index, Setter } from "solid-js";

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

interface RoundsNavigationProps {
  roundsApiModel: RoundsApiModel;
  updateRoundsApiModel: Setter<RoundApiModel | undefined>;
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
  updateRoundsApiModel,
}) => {
  const AlignedIcons = alignRoundsAndIcons(roundsApiModel.rounds);

  return (
    <div class={styles.RoundsNavigation}>
      <Index each={roundsApiModel.rounds}>
        {(round, index) => (
          <div
            class={classNames(`${round().slug}-${round().id}`, styles.Round)}
            onClick={() => {
              updateRoundsApiModel((prev) => {
                if (prev === undefined) {
                  return undefined;
                }

                return {
                  ...prev,
                  currentRound: round(),
                };
              });
            }}
          >
            {round().name}
            {AlignedIcons[index]({})}
          </div>
        )}
      </Index>
    </div>
  );
};

export { RoundsNavigation };
