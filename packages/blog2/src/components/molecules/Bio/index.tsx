import NextImage from "next/image";
import React, { FC } from "react";
import { BuyMeCoffeeButton } from "../../atoms/BuyMeCoffeeButton";
import styles from "./index.module.css";

const NAME = "Alexey Berezin";
const SUMMARY = "who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript";
const TWITTER = "beraliv";

export const Bio: FC = () => (
  <div className={styles.bio}>
    <div className={styles.avatar}>
      <NextImage
        className={styles.avatar}
        src="/profile.jpg"
        width={50}
        height={50}
        alt={`${NAME} profile image`}
      />
    </div>
    <p className={styles.summary}>
      Written by <strong>{NAME}</strong> {SUMMARY}
      {` `}
      <a
        href={`https://twitter.com/${TWITTER}`}
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
