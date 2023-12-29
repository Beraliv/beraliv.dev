import { FC, PropsWithChildren } from "react";
import styles from "./index.module.css";

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
        {children}
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
      {children}
    </a>
  );
};
