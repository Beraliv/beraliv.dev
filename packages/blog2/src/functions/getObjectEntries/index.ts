export const getObjectEntries = <Object extends Record<string, any>>(
  obj: Object
): [keyof Object, Object[keyof Object]][] => {
  let array: [keyof Object, Object[keyof Object]][] = [];
  const keys = Object.keys(obj);

  for (let key of keys) {
    array.push([key, obj[key]]);
  }

  return array;
};
