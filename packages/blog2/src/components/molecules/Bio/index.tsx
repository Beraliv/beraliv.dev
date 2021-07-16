import NextImage from "next/image";
import React, { FC } from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { BuyMeCoffeeButton } from "../../atoms/BuyMeCoffeeButton";
import styles from "./index.module.css";

export const Bio: FC = () => {
  const { author, summary, social } = BLOG_META_INFO;
  const { twitter } = social;

  return (
    <div className={styles.bio}>
      <div className={styles.avatar}>
        <NextImage
          className={styles.avatar}
          src="/profile.jpg"
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
