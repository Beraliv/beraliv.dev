import finalMock from "../league-events-by-final.json";
import semifinalMock from "../league-events-by-semifinal.json";
import quarterfinalMock from "../league-events-by-quarterfinal.json";

type Api = typeof finalMock | typeof semifinalMock | typeof quarterfinalMock;

export { type Api };
