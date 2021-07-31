import { MdxPrePropsType } from "../../components/mdx/MdxPre";
import { CODE_LANGUAGES } from "../../constants/CODE_LANGUAGES";
import { CodeLanguageType } from "../../types/CodeLanguageType";

export const getCodeLanguageType = (
  className: MdxPrePropsType["children"]["props"]["className"]
): CodeLanguageType | undefined => {
  const matches = className.match(/language-(?<language>.*)/);
  if (!matches) {
    return undefined;
  }
  if (!matches.groups) {
    return undefined;
  }
  const language = matches.groups.language as CodeLanguageType;
  if (!CODE_LANGUAGES.includes(language)) {
    return undefined;
  }
  return language;
};
