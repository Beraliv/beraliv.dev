import { join } from "path";
import type { Processor } from "unified";
import type { Node } from "unist";
import visit from "unist-util-visit";
import { promisify } from "util";
import type { VFile } from "vfile";
import { fetchJson } from "../functions/fetchJson";
import { imageLoader } from "../functions/imageLoader";
import { sizeLoader } from "../functions/sizeLoader";
import { DeepPartial } from "../types/DeepPartial";

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

type SizeInformation = {
  output: {
    width: number;
    height: number;
  };
};

const validateSize = (
  information: DeepPartial<SizeInformation> | undefined
): SizeInformation["output"] => {
  if (!information) {
    throw new Error(`Invalid object in size information`);
  }

  if (!information.output) {
    throw new Error(`Invalid output in size information`);
  }

  const { width, height } = information.output;

  if (!width) {
    throw new Error(`Invalid width in size information`);
  }

  if (!height) {
    throw new Error(`INvalid height in size information`);
  }

  return { width, height };
};

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const imageUrl = imageLoader({ src: node.properties.src });
  const sizeUrl = sizeLoader({ src: imageUrl });
  const sizeInformation: SizeInformation = await fetchJson(sizeUrl);
  const { width, height } = validateSize(sizeInformation);

  node.properties.width = width;
  node.properties.height = height;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export function imageMetadata(this: Processor) {
  return async function transformer(tree: Node, file: VFile): Promise<Node> {
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
}
