import NextImage from "next/legacy/image";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { BuyMeCoffeeButton } from "../BuyMeCoffeeButton";
import styles from "./index.module.css";

export const Bio = () => {
  const { author, summary, social } = BLOG_META_INFO;
  const { twitter } = social;

  return (
    <div className={styles.bio}>
      <div className={styles.avatar}>
        <NextImage
          className={styles.avatar}
          src="/profile_v2.png"
          width={50}
          height={50}
          alt={`${author} profile image`}
        />
      </div>
      <p className={styles.summary}>
        Written by <strong>{author}</strong> {summary}
        {` `}
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow me on Twitter
        </a>
      </p>
      <div>
        <BuyMeCoffeeButton />
      </div>
    </div>
  );
};
