import { getObjectKeys } from "./getObjectKeys";

const getObjectEntries = <Object extends Record<string, any>>(
  obj: Object
): [keyof Object, Object[keyof Object]][] => {
  let array: [keyof Object, Object[keyof Object]][] = [];
  const keys = getObjectKeys(obj);

  for (let key of keys) {
    array.push([key, obj[key]]);
  }

  return array;
};

export { getObjectEntries };
