export interface IDefinition {
  title: string;
  summary: string;
  description: string;
  link: string;
}

export const Definition = (definition: IDefinition) => (
  <div className="definition">
    <h3>{definition.title}</h3>
    {definition.summary && <p className="summary">{definition.summary}</p>}
    <p className="description">{definition.description}</p>
    <a className="link" href={definition.link}>
      {definition.link}
    </a>
  </div>
);
