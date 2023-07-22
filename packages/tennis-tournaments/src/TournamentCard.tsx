import { Component } from "solid-js";
import { TournamentPeriod } from "./Types/TournamentPeriod";
import { CourtType } from "./Types/CourtType";
import CalendarIcon from "./Icons/Calendar.svg";
import CourtIcon from "./Icons/Court.svg";

import styles from "./TournamentCard.module.css";
import { getTournamentCourtImageUrl } from "./Utils/getTournamentCourtImageUrl";
import { A } from "@solidjs/router";
import { classNames } from "./Utils/classNames";
import { formatTournamentPeriod } from "./Utils/formatTournamentPeriod";

interface TournamentCardProps {
  courtType: CourtType;
  tournamentPeriod: TournamentPeriod;
  tournamentId: number;
  tournamentName: string;
  place: string;
}

const TournamentCard: Component<TournamentCardProps> = ({
  courtType,
  tournamentId,
  tournamentPeriod,
  place,
  tournamentName,
}) => {
  const imageUrl = getTournamentCourtImageUrl(courtType);
  const formattedPeriod = formatTournamentPeriod(tournamentPeriod);

  return (
    // use link to be able to open the tournament in a new tab and/or window
    <A
      class={classNames(styles.TournamentCard, {
        [styles.HardCourt]: courtType === "hard",
        [styles.ClayCourt]: courtType === "clay",
        [styles.GrassCourt]: courtType === "grass",
      })}
      href={`/tournament/${tournamentId}/${courtType}`}
    >
      <div
        style={{ "background-image": `url(${imageUrl})` }}
        class={styles.TournamentHead}
      >
        <div class={styles.TournamentDates}>
          <div class={styles.TournamentDateIcon}>
            <CalendarIcon />
          </div>
          {formattedPeriod}
        </div>
        <div class={styles.CourtType}>
          <div class={styles.TournamentCourtIcon}>
            <CourtIcon />
          </div>
          {courtType.toUpperCase()}
        </div>
      </div>
      <div class={styles.TournamentFooter}>
        <h2>{tournamentName}</h2>
        {place}
      </div>
    </A>
  );
};

export { TournamentCard, type TournamentCardProps };
