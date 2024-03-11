import { CodeLanguageType } from "../../../types/CodeLanguageType";
import { getCodeLanguageType } from "../../../functions/getCodeLanguageType";
import { classNames } from "../../../functions/classNames";
import styles from "./index.module.css";
import { CopyToClipboardButton } from "../../molecules/CopyToClipboardButton";
import { codeToHtml } from "shiki";
import { useLayoutEffect, useRef } from "react";

export interface MdxPrePropsType {
  children: {
    props: {
      children: string;
      className: `language-${CodeLanguageType}`;
    };
  };
  title?: string;
}

export const MdxPre = (props: MdxPrePropsType) => {
  const { children, className } = props.children.props;
  const containerRef = useRef<HTMLDivElement>(null);
  const code = children.trim();
  // TODO: remove
  const language = getCodeLanguageType(className);
  const title = props.title ?? "";

  useLayoutEffect(() => {
    if (!language) {
      return;
    }

    // to refactor to avoid hydration issues
    codeToHtml(code, {
      lang: language,
      theme: "github-dark",
    }).then((compiled) => {
      containerRef.current!.innerHTML = compiled;
    });
  }, []);

  if (!language) {
    console.warn(`Cannot find language for <pre> with props`, props);
    return null;
  }

  return (
    <>
      <div className={classNames(className, styles.title)}>
        <span>{title}</span>
        <div>
          <CopyToClipboardButton whatToCopy={code} />
        </div>
      </div>
      <div ref={containerRef} className={styles.container} />
    </>
  );
};
