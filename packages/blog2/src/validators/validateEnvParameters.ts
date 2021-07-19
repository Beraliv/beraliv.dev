import { PostPropsType } from "../components/pages/Post";

export const validateEnvParameters = (): Pick<
  PostPropsType,
  "apiKey" | "formId"
> => {
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY;
  const formId = process.env.CONVERTKIT_SIGNUP_FORM_ID;

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
