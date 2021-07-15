import React, { FC } from "react";
import NextImage from "next/image";
import butMyACoffeeIcon from "/buy-me-a-coffee-icon.png";

export const BuyMeCoffeeButton: FC = () => (
  <a
    className="buymecoffee"
    href="https://www.buymeacoffee.com/beraliv"
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <NextImage src={butMyACoffeeIcon} alt="buy me a coffee" />
  </a>
);
