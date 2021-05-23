import { Link } from "gatsby"
import React from "react"

type LabelProps = {
  title: string
  to?: string
}

export const Label: React.FC<LabelProps> = ({
  title,
  to = `/tag/${title}`,
}) => (
  <Link className="label" to={to}>
    {title}
  </Link>
)
