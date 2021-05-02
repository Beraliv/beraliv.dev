import { Link } from "gatsby"
import React, { FC } from "react"
import { StaticImage } from "gatsby-plugin-image"

export const BuyMeCoffeeButton: FC = () => (
  <Link className="buymecoffee" to="https://www.buymeacoffee.com/beraliv">
    <StaticImage src="./buy-me-a-coffee-icon.png" alt="buy me a coffee" />
  </Link>
)
