import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { createLocalLinkId } from "../../../functions/createLocalLinkId";
import { validateNever } from "../../../validators/validateNever";
import { LinkIcon } from "../../atoms/LinkIcon";
import styles from "./index.module.css";

interface MdxHeaderPropsType {
  type: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const MdxHeader: FC<MdxHeaderPropsType> = ({ children, type }) => {
  if (typeof children !== "string") {
    return null;
  }

  const HeaderComponent = (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => {
    if (type === "h2") {
      return <h2 {...props}>{props.children}</h2>;
    }

    if (type === "h3") {
      return <h3 {...props}>{props.children}</h3>;
    }

    if (type === "h4") {
      return <h4 {...props}>{props.children}</h4>;
    }

    if (type === "h5") {
      return <h5 {...props}>{props.children}</h5>;
    }

    if (type === "h6") {
      return <h6 {...props}>{props.children}</h6>;
    }

    validateNever(type);
    return null;
  };

  const title = children;
  const id = createLocalLinkId(title);

  if (type === "h2") {
    return (
      <HeaderComponent id={id} className={styles.header}>
        <a href={`#${id}`} aria-label={`${title} link`} className={styles.link}>
          <div className={styles.icon}>
            <LinkIcon />
          </div>
        </a>
        {title}
      </HeaderComponent>
    );
  }

  return null;
};
