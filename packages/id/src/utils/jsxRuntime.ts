export function h(
  type:
    | keyof JSX.IntrinsicElements
    | ((props: Record<string, unknown>) => HTMLElement | DocumentFragment),
  props: Record<string, unknown>,
  ...children: JSX.Element[]
): JSX.Element {
  return { type, props: props || {}, children };
}

export function Fragment(props: JSX.Element): JSX.Element[] {
  return props.children;
}
