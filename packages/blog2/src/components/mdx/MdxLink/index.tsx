import { FC, PropsWithChildren } from "react";
import styles from "./index.module.css";
import { Link } from "../../atoms/Link";

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

  return <Link href={href} text={children} underscore />;
};
