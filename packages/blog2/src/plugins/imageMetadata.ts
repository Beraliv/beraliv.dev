import type { Pluggable } from "unified";
import type { Node } from "unist";
import { visit } from "unist-util-visit";
import { extractMetadata } from "../functions/extractMetadata";

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

const SUPPORTED_IMAGE_EXTENSIONS = ["jpg", "png"];

/**
 * Filters out non absolute paths from the public folder.
 */
function filterImageNode(node: ImageNode): boolean {
  return (
    node.properties.src.startsWith("/") &&
    SUPPORTED_IMAGE_EXTENSIONS.some((extension) =>
      node.properties.src.endsWith(`.${extension}`)
    )
  );
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const { width, height } = await extractMetadata(node.properties.src);

  node.properties.width = width;
  node.properties.height = height;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/pages/api-reference/components/image#layout
 */
export const imageMetadata: Pluggable = () =>
  async function transformer(tree, file): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
