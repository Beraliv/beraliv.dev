import { StrictOmit } from "ts-essentials";
import { PostPropsType } from "../components/pages/Post";
import { PostType } from "./PostType";
import { SanitisedString } from "./SanitisedString";

export type ValidatedPostType = StrictOmit<PostPropsType["post"], "title"> &
  Pick<PostType, "image"> & { title: SanitisedString };
