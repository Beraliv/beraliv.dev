import { h } from "@jsxRuntime";

export const htmlToJSX = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const children = Array.from(doc.body.childNodes as NodeListOf<HTMLElement>)
    .map(convertNodeToJSX)
    .filter((child) => child !== null);
  const main = h("main", { className: "post" }, ...children);
  return main;
};

const convertNodeToJSX = (node: HTMLElement): JSX.Element | string | null => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  const type = node.nodeName.toLowerCase() as JSX.Element["type"];
  const props: Record<string, string> = {};

  for (const attr of node.attributes) {
    props[attr.name] = attr.value;
  }

  const children = Array.from(node.childNodes as NodeListOf<HTMLElement>)
    .map(convertNodeToJSX)
    .filter((child) => child !== null);

  return h(type, props, ...children);
};
