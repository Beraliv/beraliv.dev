import { useState } from "react";

export const useQuery = () => {
  const [query, _setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("query") || "";
  });

  const setQuery = (query: string) => {
    window.history.pushState("", "", `?query=${query}`);
    _setQuery(query);
  };

  return [query, setQuery] as const;
};
