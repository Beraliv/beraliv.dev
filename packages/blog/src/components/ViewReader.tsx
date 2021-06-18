import React, { FC } from "react"
import useSwr from "swr"
import { fetcher } from "../functions/fetcher"
import { ViewsApi } from "../types/ViewsApi"

interface ViewReaderProps {
  slug: string
}

export const ViewReader: FC<ViewReaderProps> = ({ slug }) => {
  const { data } = useSwr<ViewsApi>(`/api/views?slug=${slug}`, fetcher)
  const views = data?.views ?? 0
  return <>{views > 0 ? views.toLocaleString() : "–––"} views</>
}
