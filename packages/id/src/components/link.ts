import externalSvg from "./svgs/external.svg?raw";

export type TextLinkProps = { href: string; text: string; external?: boolean };

type LogoLinkProps = { href: string; logo: string };

type LinkProps = TextLinkProps | LogoLinkProps;

/**
 * Link component
 *
 * Text can be both internal (default) and external, while logo is always
 * external
 */
export const link = (props: LinkProps) => {
  if ("text" in props) {
    const { href, text, external } = props;

    return `<a href="${href}"${
      external ? ' target="_blank" rel="noopener noreferrer"' : ""
    }>${text}${
      external ? `<span class="linkExternal">&#xFEFF;${externalSvg}</span>` : ""
    }</a>`;
  }

  const { href, logo } = props;

  return `<a class="logo" href="${href}" target="_blank" rel="noopener noreferrer">${logo}</a>`;
};
