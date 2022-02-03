import { validateConvertKitParameters } from "../validators/validateConvertKitParameters";

export const getNotFoundStaticProps = async () => {
  const { apiKey, formId } = validateConvertKitParameters();

  return {
    props: {
      apiKey,
      formId,
    },
  };
};
