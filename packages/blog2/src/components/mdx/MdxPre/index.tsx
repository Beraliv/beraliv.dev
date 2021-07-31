import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import { CodeLanguageType } from "../../../types/CodeLanguageType";
import { getCodeLanguageType } from "../../../functions/getCodeLanguageType";
import { classNames } from "../../../functions/classNames";
import styles from "./index.module.css";
import { getCodeTitle } from "../../../functions/getCodeTitle";

export interface MdxPrePropsType {
  children: {
    props: {
      children: string;
      className: `language-${CodeLanguageType}`;
      metastring?: string;
    };
  };
}

export const MdxPre = (props: MdxPrePropsType) => {
  console.log(`>>> MdxPre`, props);

  const { children, className, metastring } = props.children.props;
  const code = children.trim();
  const language = getCodeLanguageType(className);
  const title = getCodeTitle(metastring);

  if (!language) {
    throw new Error(`Cannot identify the language`);
  }

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {title && (
            <div className={classNames(className, styles.title)} style={style}>
              <span>{title}</span>
              <div>copy</div>
            </div>
          )}
          <pre className={classNames(className, styles.pre)} style={style}>
            {tokens.map((line, i) => {
              const { className: lineClassName, ...lineProps } = getLineProps({
                line,
                key: i,
              });

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
        </>
      )}
    </Highlight>
  );
};
