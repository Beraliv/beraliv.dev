import { FC, PropsWithChildren } from "react";
import styles from "./index.module.css";
import { ExternalIcon } from "../../atoms/ExternalIcon";

interface MdxLinkPropsType {
  href: string;
}

export const MdxLink: FC<PropsWithChildren<MdxLinkPropsType>> = ({
  children,
  href,
}) => {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <a className={styles.link} href={href}>
        <span className={styles.underscore}>{children}</span>
      </a>
    );
  }

  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.underscore}>{children}</span>
      <span className={styles.linkExternal}>
        &#xFEFF;
        <ExternalIcon />
      </span>
    </a>
  );
};
