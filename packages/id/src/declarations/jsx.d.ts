declare namespace JSX {
  type IntrinsicElements = {
    [Key in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[Key]>;
  } & {
    svg: Partial<{
      width: number;
      height: number;
      fill: string;
      viewBox: string;
    }>;
    path: Partial<{
      d: string;
      fill: string;
    }>;
  } & {
    Fragment: {};
  };

  interface Element {
    type:
      | keyof IntrinsicElements
      | ((props: Record<string, unknown>) => Element);
    props: Record<string, string>;
    children: JSX.Element[];
  }
}
