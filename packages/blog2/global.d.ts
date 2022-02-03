import { Percents } from "./src/types/Percents";

// My css.d.ts file
import * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    "--scroll"?: `${Percents}%`;
  }
}

declare global {
  interface PlausibleEventOptions {
    "404": {
      props: {
        path: string;
      };
    };
  }

  declare var plausible: <K extends keyof PlausibleEventOptions>(
    event: K,
    options: PlausibleEventOptions[K]
  ) => void;
}
