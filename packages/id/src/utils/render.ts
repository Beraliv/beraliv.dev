const renderElement = (
  node: JSX.Element,
  container: HTMLElement | DocumentFragment
) => {
  const { type, props, children } = node;

  if (type === "svg" || type === "path") {
    const svgNamespace = "http://www.w3.org/2000/svg";

    const dom = document.createElementNS(svgNamespace, type);

    Object.keys(props).forEach((key) => {
      // @ts-expect-error: types are not mapped
      dom.setAttribute(key, props[key]);
    });

    // @ts-expect-error: types are not mapped
    children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  } else {
    // @ts-expect-error: wrong type mapping
    const dom = document.createElement(type);

    Object.keys(props).forEach((key) => {
      if (key === "className") {
        // @ts-expect-error: types are not mapped
        dom.setAttribute("class", props[key]);
      } else {
        // @ts-expect-error: types are not mapped
        dom.setAttribute(key, props[key]);
      }
    });

    children.forEach((child) => child && render(child, dom));

    container.appendChild(dom);
  }
};

export const render = (
  node: JSX.Element,
  container: HTMLElement | DocumentFragment
) => {
  if (typeof node === "string" || typeof node === "number") {
    container.appendChild(document.createTextNode(node));
    return;
  }

  const { type, props, children } = node;

  if (typeof type === "function") {
    const customElement = type({ ...props, children });

    renderElement(customElement, container);
  } else {
    if (type === "Fragment") {
      const dom = document.createDocumentFragment();

      Object.keys(props).forEach((key) => {
        // @ts-expect-error: types are not mapped
        dom[key] = props[key];
      });

      children.forEach((child) => child && render(child, dom));

      container.appendChild(dom);
    } else {
      renderElement(node, container);
    }
  }
};
