import { SanitisedString } from "../../types/SanitisedString";
import { UnsanitisedString } from "../../types/UnsanitisedString";

export const sanitiseHtml = (html: UnsanitisedString): SanitisedString => {
  const htmlWithoutShy = html.replace(/&shy;/g, "");
  return htmlWithoutShy as SanitisedString;
};
