import { EVENT_TYPES } from "../Constants/EVENT_TYPES";

type TournamentIds = Record<(typeof EVENT_TYPES)[number], number>;

export { type TournamentIds };
