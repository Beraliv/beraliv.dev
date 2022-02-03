import { Percents } from "./src/types/Percents";
import { LabelType } from "./src/types/LabelType";

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
    Label: {
      props: {
        type: LabelType;
      };
    };
  }

  declare var plausible: <K extends keyof PlausibleEventOptions>(
    event: K,
    options: PlausibleEventOptions[K]
  ) => void;
}
