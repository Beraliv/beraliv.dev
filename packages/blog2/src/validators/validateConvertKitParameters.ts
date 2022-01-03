import { PostPropsType } from "../components/pages/Post";

export const validateConvertKitParameters = (): Pick<
  PostPropsType,
  "apiKey" | "formId"
> => {
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY ?? "";
  const formId = process.env.CONVERTKIT_SIGNUP_FORM_ID ?? "";

  if (!apiKey) {
    // TODO: throw error in production
    console.error(`Cannot find api key in env parameters`);
  }

  if (!formId) {
    // TODO: throw error in production
    console.error(`Cannot find form id in env parameters`);
  }

  return {
    apiKey,
    formId,
  };
};
