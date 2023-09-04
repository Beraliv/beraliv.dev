const getObjectKeys = <Object extends Record<string, any>>(obj: Object) =>
  Object.keys(obj) as (keyof Object)[];

export { getObjectKeys };
