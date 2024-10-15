interface LinkProps {
  href: string;
  text: string;
  external?: boolean;
}

export const link = ({ href, text, external = false }: LinkProps) =>
  `<a href="${href}"${
    external ? ' target="_blank" rel="noopener noreferrer"' : ""
  }>${text}</a>`;
