import { Post } from "../src/components/pages/Post";
import { getPostStaticPaths } from "../src/static/getPostStaticPaths";
import { getPostStaticProps } from "../src/static/getPostStaticProps";

export default Post;

export const getStaticProps = getPostStaticProps;

export const getStaticPaths = getPostStaticPaths;
