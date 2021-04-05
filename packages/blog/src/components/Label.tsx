import { Link } from "gatsby"
import React from "react"

type LabelProps = {
  title: string
}

export const Label: React.FC<LabelProps> = ({ title }) => (
  <Link className="label" to={`/tags/${title}`}>
    {title}
  </Link>
)
