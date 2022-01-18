import { useEffect } from "react";
import { ViewReader } from "../atoms/ViewReader";

interface ViewCounterProps {
  slug: string;
}

export const ViewCounter = ({ slug }: ViewCounterProps) => {
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views?slug=${slug}`, {
        method: "POST",
      });

    registerView();
  }, [slug]);

  return <ViewReader slug={slug} />;
};
