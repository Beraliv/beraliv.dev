import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";

import CalendarIcon from "./Icons/Calendar.svg";
import CourtIcon from "./Icons/Court.svg";
import { CourtType } from "./Types/CourtType";
import { TournamentPeriod } from "./Types/TournamentPeriod";
import { classNames } from "./Utils/classNames";
import { formatTournamentPeriod } from "./Utils/formatTournamentPeriod";
import { getTournamentCourtImageUrl } from "./Utils/getTournamentCourtImageUrl";
import { getTournamentLiveStatus } from "./Utils/getTournamentLiveStatus";

import styles from "./TournamentCard.module.css";
import { TournamentType } from "./Types/TournamentType";

interface TournamentCardProps {
  courtType: CourtType;
  place: string;
  tournamentId: number;
  tournamentName: string;
  tournamentPeriod: TournamentPeriod;
  tournamentType: TournamentType;
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
  const isLive = getTournamentLiveStatus(tournamentPeriod);
  const tournamentPath = `/tournament/${tournamentName}/${tournamentId}/${courtType}`;

  return (
    // use link to be able to open the tournament in a new tab and/or window
    <A
      class={classNames(styles.TournamentCard, {
        [styles.HardCourt]: courtType === "hard",
        [styles.ClayCourt]: courtType === "clay",
        [styles.GrassCourt]: courtType === "grass",
      })}
      href={tournamentPath}
    >
      <div
        style={{ "background-image": `url(${imageUrl})` }}
        class={styles.TournamentHead}
      >
        <div class={styles.TournamentHeadTop}>
          <Show when={isLive}>
            <div class={styles.LiveTournament}>LIVE</div>
          </Show>
        </div>
        <div class={styles.TournamentHeadBottom}>
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
      </div>
      <div class={styles.TournamentFooter}>
        <h2>{tournamentName}</h2>
        {place}
      </div>
    </A>
  );
};

export { TournamentCard, type TournamentCardProps };
