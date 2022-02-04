import { readFile, writeFile } from "fs";
import { join } from "path";
import { DeepPartial } from "ts-essentials";
import { promisify } from "util";
import { SizeInformation } from "../../types/SizeInformation";
import { fetchJson } from "../fetchJson";
import { sizeLoader } from "../sizeLoader";
import { imageLoader } from "../imageLoader";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

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

export async function extractMetadata(
  src: string
): Promise<SizeInformation["output"]> {
  const cachePath = join(process.cwd(), "src", "cache", "imageMetadata.json");
  const rawCache = await readFileAsync(cachePath, "utf8");
  const cache = JSON.parse(rawCache);

  if (cache[src]) {
    const { width, height } = cache[src];

    return { width, height };
  }

  const imageUrl = imageLoader({ src });
  const sizeUrl = sizeLoader({ src: imageUrl });
  const sizeInformation: SizeInformation = await fetchJson(sizeUrl);
  const { width, height } = validateSize(sizeInformation);

  cache[src] = { width, height };
  const updatedCache = JSON.stringify(cache, null, 2);
  await writeFileAsync(cachePath, updatedCache);

  return { width, height };
}
