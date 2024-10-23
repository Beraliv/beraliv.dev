import { ExternalIcon } from "./icons/ExternalIcon";

export type TextLinkProps = {
  href: string;
  text: string;
  external?: boolean;
};

type LogoLinkProps = { href: string; logo: JSX.Element };

type LinkProps = TextLinkProps | LogoLinkProps;

/**
 * Link component
 *
 * Text can be both internal (default) and external, while logo is always
 * external
 */
export const Link = (props: LinkProps) => {
  if ("text" in props) {
    const { href, text, external } = props;
    const linkProps: Partial<HTMLAnchorElement> = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <a href={href} {...linkProps}>
        {text}
        {external ? (
          <span className="linkExternal">
            &#xFEFF;
            <ExternalIcon />
          </span>
        ) : (
          ""
        )}
      </a>
    );
  }

  const { href, logo } = props;

  return (
    <a className="logo" href={href} target="_blank" rel="noopener noreferrer">
      {logo}
    </a>
  );
};
