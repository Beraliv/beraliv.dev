import { PostPropsType } from "../components/pages/Post";

export const validateConvertKitParameters = (): Pick<
  PostPropsType,
  "apiKey" | "formId"
> => {
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY ?? "";
  const formId = process.env.CONVERTKIT_SIGNUP_FORM_ID ?? "";

  console.log(">>> ENV", process.env.NODE_ENV);

  if (!apiKey) {
    throw new Error(`Cannot find api key in env parameters`);
  }

  if (!formId) {
    throw new Error(`Cannot find form id in env parameters`);
  }

  return {
    apiKey,
    formId,
  };
};
