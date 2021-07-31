import { FC } from "react";

interface MdxLinkPropsType {
  href: string;
}

export const MdxLink: FC<MdxLinkPropsType> = ({ children, href }) => {
  if (href.startsWith("/")) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
