import { ReactNode } from "react";
import { classNames } from "../../../functions/classNames";
import { ExternalIcon } from "../ExternalIcon";
import styles from "./index.module.css";

export interface LinkPropsType {
  href: string;
  text: ReactNode;
  underscore?: boolean;
  external?: boolean;
}

export const Link = ({ href, text, underscore, external }: LinkPropsType) => (
  <a
    className={styles.link}
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    <span
      className={classNames({
        [styles.underscore]: Boolean(underscore),
      })}
    >
      {text}
    </span>
    {external && (
      <span className={styles.linkExternal}>
        &#xFEFF;
        <ExternalIcon />
      </span>
    )}
  </a>
);
