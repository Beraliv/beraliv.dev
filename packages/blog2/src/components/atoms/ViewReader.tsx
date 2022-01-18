import useSwr from "swr";
import { fetchJson } from "../../functions/fetchJson";

interface ViewsApi {
  views?: number;
}

interface ViewReaderProps {
  slug: string;
}

export const ViewReader = ({ slug }: ViewReaderProps) => {
  const { data } = useSwr<ViewsApi>(`/api/views?slug=${slug}`, fetchJson);
  const views = data?.views ?? 0;
  return <>{views > 0 ? views.toLocaleString() : "–––"} views</>;
};
