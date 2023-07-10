import { TennisSide } from "./TennisSide";

type MatchStatus =
  | { type: "DID_NOT_STARTED" }
  // TODO: add serves: TennisSide
  | { type: "IN_PROGRESS" }
  | { type: "SUSPENDED" }
  | { type: "FINISHED"; winner: TennisSide | undefined }
  // TODO: add reason: string
  | { type: "CANCELLED"; winner: TennisSide | undefined };

export { type MatchStatus };
