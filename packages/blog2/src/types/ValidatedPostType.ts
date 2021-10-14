import { PostPropsType } from "../components/pages/Post";
import { PostType } from "./PostType";

export type ValidatedPostType = PostPropsType["post"] & Pick<PostType, "image">;
