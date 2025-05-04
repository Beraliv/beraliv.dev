const renderElement = (
  node: JSX.Element,
  container: HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement
) => {
  const { type, props, children } = node;

  if (typeof type === "function") {
    const customElement = type({ ...props, children });

    renderElement(customElement, container);
  } else if (type === "svg" || type === "path") {
    const svgNamespace = "http://www.w3.org/2000/svg";

    const dom = document.createElementNS(svgNamespace, type);

    Object.keys(props).forEach((key) => {
      dom.setAttribute(key, props[key]);
    });

    children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  } else if (type === "fragment") {
    const dom = document.createDocumentFragment();

    // fragment doesn't have props

    // All elements are resolved in the first element
    (children[0] as unknown as JSX.Element[]).forEach(
      (child) => child && render(child, dom)
    );

    container.appendChild(dom);
  } else {
    const dom = document.createElement(type);

    Object.keys(props).forEach((key) => {
      // @ts-expect-error: some properties are readonly
      dom[key] = props[key];
    });

    children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  }
};

export const render = (
  node: JSX.Element | JSX.Element[],
  container: HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement
) => {
  if (typeof node === "string" || typeof node === "number") {
    container.appendChild(document.createTextNode(node));
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((child) => child && render(child, container));
    return;
  }

  const { type, props, children } = node;

  if (typeof type === "function") {
    const customElement = type({ ...props, children });

    renderElement(customElement, container);
  } else if (typeof type === "string") {
    renderElement(node, container);
  } else {
    throw new Error(`Unknown node type: ${type}`);
  }
};
