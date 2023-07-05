import { Component } from "solid-js";
import { TournamentPeriod } from "./Types/TournamentPeriod";
import { CourtType } from "./Types/CourtType";
import CalendarIcon from "./Icons/Calendar.svg";

import styles from "./TournamentCard.module.css";
import { getTournamentCourtImageUrl } from "./Utils/getTournamentCourtImageUrl";
import { useNavigate } from "@solidjs/router";

interface TournamentCardProps {
  courtType: CourtType;
  tournamentPeriod: TournamentPeriod;
  tournamentId: string;
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

  // TODO: format date

  const tournamentPeriodStart = tournamentPeriod.start.toDateString();
  const tournamentPeriodEnd = tournamentPeriod.end.toDateString();

  return (
    <div
      class={styles.TournamentCard}
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
          {`${tournamentPeriodStart} - ${tournamentPeriodEnd}`}
        </div>
        {/* TODO: add court icon */}
        <div class={styles.CourtType}>{courtType.toUpperCase()}</div>
      </div>
      <div class={styles.TournamentFooter}>
        <h2>{tournamentName}</h2>
        {place}
      </div>
    </div>
  );
};

export { TournamentCard };
