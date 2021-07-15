import React, { FC } from "react";
import NextImage from "next/image";
import butMyACoffeeIcon from "../../../../public/buy-me-a-coffee-icon.png";
import styles from "./index.module.css";

export const BuyMeCoffeeButton: FC = () => (
  <a
    className={styles.buymecoffee}
    href="https://www.buymeacoffee.com/beraliv"
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <NextImage src={butMyACoffeeIcon} alt="buy me a coffee" />
  </a>
);
