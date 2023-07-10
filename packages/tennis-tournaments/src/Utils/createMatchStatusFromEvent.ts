import { EventApiModel } from "../Types/EventApiModel";
import { MatchStatus } from "../Types/MatchStatus";
import { TennisSide } from "../Types/TennisSide";
import { exhaustiveCheck } from "./exhaustiveCheck";

const createMatchStatusFromEvent = (event: EventApiModel): MatchStatus => {
  const status = event.status;

  if (status.type === "notstarted") {
    return { type: "DID_NOT_STARTED" };
  }

  // https://rapidapi.com/fluis.lacasse/api/tennisapi1/discussions/95944
  const winner: TennisSide | undefined =
    event.winnerCode === 1
      ? "home"
      : event.winnerCode === 2
      ? "away"
      : undefined;

  if (status.type === "inprogress") {
    return { type: "IN_PROGRESS" };
  }

  if (status.type === "canceled") {
    return { type: "CANCELLED", winner };
  }

  if (status.type === "finished") {
    return { type: "FINISHED", winner };
  }

  if (status.type === "suspended") {
    return { type: "SUSPENDED" };
  }

  exhaustiveCheck(status.type);
  return { type: status.type };
};

export { createMatchStatusFromEvent };
