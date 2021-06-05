import React, { FC } from "react"
import { StaticImage } from "gatsby-plugin-image"

export const BuyMeCoffeeButton: FC = () => (
  <a
    className="buymecoffee"
    href="https://www.buymeacoffee.com/beraliv"
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <StaticImage src="./buy-me-a-coffee-icon.png" alt="buy me a coffee" />
  </a>
)
