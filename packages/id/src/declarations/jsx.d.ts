declare namespace JSX {
  type IntrinsicElements = {
    [Key in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[Key]>;
  } & {
    Fragment: {};
  };

  interface Element {
    type:
      | keyof IntrinsicElements
      | ((props: Record<string, unknown>) => HTMLElement | DocumentFragment);
    props: Record<string, unknown>;
    children: JSX.Element[];
  }
}
