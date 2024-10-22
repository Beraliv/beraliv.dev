import { parseArgs } from "node:util";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cloudinary from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  values: { key, secret },
} = parseArgs({
  options: {
    key: {
      type: "string",
    },
    secret: {
      type: "string",
    },
  },
});

const CLOUD_NAME = "beraliv";
const CLOUDINARY_FOLDER = "beraliv_com";
const LOCAL_FOLDER = join(__dirname, "../src/components/images");

// Configure Cloudinary with your API credentials
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: key,
  api_secret: secret,
});

/**
 * @param {string} filename
 * @param {string} imageUrl
 */
async function uploadToCloudinary(imageNameWithExtension) {
  const [imageName] = imageNameWithExtension.split(".");

  const imageUrl = `${LOCAL_FOLDER}/${imageNameWithExtension}`;

  try {
    if (imageName.includes(" ")) {
      console.error(`Invalid image name ❌: remove a space from ${imageName}`);
      return;
    }

    await cloudinary.v2.uploader.upload(imageUrl, {
      public_id: imageName,
      folder: CLOUDINARY_FOLDER,
    });

    console.error(`Image is uploaded ✅: ${imageNameWithExtension}`);
  } catch (error) {
    console.error(
      `Error uploading image ❌:\n` +
        `   Error:  ${error.message}\n` +
        `   Name:   ${imageName}`
    );
    process.exit(1);
  }
}

async function getImages() {
  try {
    const files = readdirSync(LOCAL_FOLDER);
    return files;
  } catch (error) {
    return [];
  }
}

async function main() {
  const images = await getImages();
  const uploads = [];
  for (const image of images) {
    uploads.push(uploadToCloudinary(image));
  }
  try {
    await Promise.all(uploads);

    console.error(`Images are uploaded ✅`);
    process.exit(0);
  } catch (error) {
    console.error(`Image are failed to upload ❌`);
    process.exit(1);
  }
}

main();
