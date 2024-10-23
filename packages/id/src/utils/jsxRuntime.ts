export function h(
  type: string,
  props: Record<string, unknown>,
  ...children: JSX.Element[]
): JSX.Element {
  return { type, props: props || {}, children };
}

export function Fragment(props: JSX.Element): JSX.Element[] {
  return props.children;
}
