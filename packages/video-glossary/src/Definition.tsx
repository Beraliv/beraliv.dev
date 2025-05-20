export interface IDefinition {
  title: string;
  summary: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
}

export const Definition = (definition: IDefinition) => (
  <div className="definition">
    <h3>{definition.title}</h3>
    {definition.summary && <p className="summary">{definition.summary}</p>}
    <p className="description">{definition.description}</p>
    <a
      className="link"
      href={definition.link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {definition.link.text}
    </a>
  </div>
);
