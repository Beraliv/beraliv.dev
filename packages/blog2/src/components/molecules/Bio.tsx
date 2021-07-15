import NextImage from "next/image";
import React, { FC } from "react";
import { BuyMeCoffeeButton } from "../atoms/BuyMeCoffeeButton";
import avatarImage from "../../../public/profile.jpg";

const NAME = "Alexey Berezin";
const SUMMARY = "who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript";
const TWITTER = "beraliv";

export const Bio: FC = () => (
  <div className="bio">
    <NextImage
      className="bio-avatar"
      src={avatarImage}
      alt={`${NAME} profile image`}
    />
    <p>
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
    <div className="block">
      <BuyMeCoffeeButton />
    </div>
  </div>
);
