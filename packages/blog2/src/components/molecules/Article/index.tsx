import { Link, LinkPropsType } from "../../atoms/Link";
import styles from "./index.module.css";

type ArticleProps = LinkPropsType & {
  time: string;
};

export const Article = ({ href, text, time }: ArticleProps) => (
  <article className={styles.article}>
    <div>
      <Link href={href} text={text} external={false} />
    </div>
    <time>{time}</time>
  </article>
);
