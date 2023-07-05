import { Component } from "solid-js";
import { TournamentPeriod } from "./Types/TournamentPeriod";
import { CourtType } from "./Types/CourtType";
import CalendarIcon from "./Icons/Calendar.svg";
import CourtIcon from "./Icons/Court.svg";

import styles from "./TournamentCard.module.css";
import { getTournamentCourtImageUrl } from "./Utils/getTournamentCourtImageUrl";
import { useNavigate } from "@solidjs/router";
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
  const navigate = useNavigate();
  const imageUrl = getTournamentCourtImageUrl(courtType);
  const formattedPeriod = formatTournamentPeriod(tournamentPeriod);

  return (
    <div
      class={classNames(styles.TournamentCard, {
        [styles.HardCourt]: courtType === "hard",
        [styles.ClayCourt]: courtType === "clay",
        [styles.GrassCourt]: courtType === "grass",
      })}
      onClick={() => navigate(`/tournament/${tournamentId}`)}
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
    </div>
  );
};

export { TournamentCard };
