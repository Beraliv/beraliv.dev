import { Percents } from "./src/types/Percents";

// My css.d.ts file
import * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    "--scroll"?: `${Percents}%`;
  }
}
