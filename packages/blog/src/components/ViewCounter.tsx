import React, { FC, useEffect } from "react"
import { ViewReader } from "./ViewReader"

interface ViewCounterProps {
  slug: string
}

export const ViewCounter: FC<ViewCounterProps> = ({ slug }) => {
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views?slug=${slug}`, {
        method: "POST",
      })

    registerView()
  }, [slug])

  return <ViewReader slug={slug} />
}
