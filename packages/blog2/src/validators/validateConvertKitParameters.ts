import { PostPropsType } from "../components/pages/Post";
import { error } from "../functions/error";

export const validateConvertKitParameters = (): Pick<
  PostPropsType,
  "apiKey" | "formId"
> => {
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY ?? "";
  const formId = process.env.CONVERTKIT_SIGNUP_FORM_ID ?? "";

  if (!apiKey) {
    error(`Cannot find api key in env parameters`);
  }

  if (!formId) {
    error(`Cannot find form id in env parameters`);
  }

  return {
    apiKey,
    formId,
  };
};
