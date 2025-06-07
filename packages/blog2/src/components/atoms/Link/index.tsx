import { ReactNode } from "react";
import { classNames } from "../../../functions/classNames";
import { ExternalIcon } from "../ExternalIcon";
import styles from "./index.module.css";

interface LinkPropsType {
  href: string;
  text: ReactNode;
  underscore?: boolean;
}

export const Link = ({ href, text, underscore }: LinkPropsType) => (
  <a
    className={styles.link}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span
      className={classNames({
        [styles.underscore]: Boolean(underscore),
      })}
    >
      {text}
    </span>
    <span className={styles.linkExternal}>
      &#xFEFF;
      <ExternalIcon />
    </span>
  </a>
);
