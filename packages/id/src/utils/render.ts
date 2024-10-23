export function render(
  node: JSX.Element,
  container: HTMLElement | DocumentFragment
) {
  if (typeof node === "string" || typeof node === "number") {
    container.appendChild(document.createTextNode(node));
    return;
  }

  const { type, props, children } = node;

  if (typeof type === "function") {
    const customElement = type({ ...props, children });

    // @ts-expect-error: update types
    const dom = document.createElement(customElement.type);

    // @ts-expect-error: update types
    Object.keys(customElement.props).forEach((key) => {
      // @ts-expect-error: types are not mapped
      dom[key] = customElement.props[key];
    });

    // @ts-expect-error: update types
    customElement.children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  } else {
    const dom =
      type === "Fragment"
        ? document.createDocumentFragment()
        : document.createElement(type);

    Object.keys(props).forEach((key) => {
      // @ts-expect-error: types are not mapped
      dom[key] = props[key];
    });

    children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  }
}
