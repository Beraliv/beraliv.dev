import Highlight, { defaultProps } from "prism-react-renderer";
import { CodeLanguageType } from "../../../types/CodeLanguageType";
import { getCodeLanguageType } from "../../../functions/getCodeLanguageType";
import { classNames } from "../../../functions/classNames";
import styles from "./index.module.css";
import { CopyToClipboardButton } from "../../molecules/CopyToClipboardButton";

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
  const code = children.trim();
  const language = getCodeLanguageType(className);
  const title = props.title ?? "";

  if (!language) {
    console.warn(`Cannot find language for <pre> with props`, props);
    return null;
  }

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={{ plain: {}, styles: [] }}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <div className={classNames(className, styles.title)} style={style}>
            <span>{title}</span>
            <div>
              <CopyToClipboardButton whatToCopy={code} />
            </div>
          </div>
          <div className={styles.container}>
            <pre className={classNames(className, styles.pre)} style={style}>
              {tokens.map((line, i) => {
                const { className: lineClassName, ...lineProps } = getLineProps(
                  {
                    line,
                    key: i,
                  }
                );

                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={classNames(lineClassName, styles.line)}
                  >
                    <span className={styles.lineNumber}>{i + 1}</span>
                    <span className={styles.lineContent}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        </>
      )}
    </Highlight>
  );
};
