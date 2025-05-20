import { type ChangeEvent, useCallback, useMemo } from "react";
import { Definition, type IDefinition } from "./Definition";
import { useQuery } from "./useQuery";

interface ISearchProps {
  definitions: IDefinition[];
}

export const Search = ({ definitions }: ISearchProps) => {
  const [query, setQuery] = useQuery();

  const visibleDefinitions = useMemo(() => {
    if (!query) return definitions;

    const lowercaseQuery = query.toLowerCase();
    return definitions.filter(
      (definition) =>
        definition.title.toLowerCase().includes(lowercaseQuery) ||
        definition.summary.toLowerCase().includes(lowercaseQuery) ||
        definition.description.toLowerCase().includes(lowercaseQuery)
    );
  }, [definitions, query]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery]
  );

  return (
    <div className="search-container">
      <input
        type="search"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="search-input"
      />
      <div className="search-results">
        {visibleDefinitions.map((definition) => (
          <Definition {...definition} key={definition.title} />
        ))}
      </div>
    </div>
  );
};
