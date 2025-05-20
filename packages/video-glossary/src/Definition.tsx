export interface IDefinition {
  title: string;
  summary: string;
  description: string;
  link: string;
}

export const Definition = (definition: IDefinition) => (
  <a href={definition.link} className="search-result">
    <h3>{definition.title}</h3>
    <p className="summary">{definition.summary}</p>
    <p className="description">{definition.description}</p>
  </a>
);
