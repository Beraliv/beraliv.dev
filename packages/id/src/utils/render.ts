const renderElement = (
  node: JSX.Element,
  container: HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement
) => {
  if (node === null) {
    return;
  }

  if (typeof node === "string" || typeof node === "number") {
    return container.appendChild(document.createTextNode(node));
  }

  const { type, props, children } = node;

  if (typeof type === "function") {
    renderElement(type({ ...props, children }), container);
  } else if (type === "svg" || type === "path") {
    const svgNamespace = "http://www.w3.org/2000/svg";

    const dom = document.createElementNS(svgNamespace, type);

    Object.keys(props).forEach((key) => {
      dom.setAttribute(key, props[key]);
    });

    children.forEach((child) => child && render(child, dom));

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
  node: string | JSX.Element,
  container: HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement
) => {
  if (typeof node === "string" || typeof node === "number") {
    return container.appendChild(document.createTextNode(node));
  }

  const { type, props, children } = node;

  if (typeof type === "function") {
    renderElement(type({ ...props, children }), container);
  } else {
    if (type === "Fragment") {
      const dom = document.createDocumentFragment();

      Object.keys(props).forEach((key) => {
        // @ts-expect-error: some properties are readonly
        dom[key] = props[key];
      });

      children.forEach((child) => child && render(child, dom));

      container.appendChild(dom);
    } else {
      renderElement(node, container);
    }
  }
};
