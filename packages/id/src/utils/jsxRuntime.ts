export function h(
  type: JSX.Element["type"],
  props: JSX.Element["props"],
  ...children: JSX.Element["children"]
): JSX.Element {
  return { type, props: props || {}, children };
}

export function Fragment(props: JSX.Element): JSX.Element[] {
  return props.children;
}
