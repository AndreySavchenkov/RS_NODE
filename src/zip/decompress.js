import zlib from "zlib";
import fs from "fs";
import { pipeline } from "stream/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const decompressedFile = join(__dirname, "files", "decompressedFile.txt");
const compressedFile = join(__dirname, "files", "archive.gz");

const decompress = async () => {
  const readStream = fs.createReadStream(compressedFile);
  const writeStream = fs.createWriteStream(decompressedFile);
  const gunzipStream = zlib.createGunzip();

  try {
    await pipeline(readStream, gunzipStream, writeStream);
    console.log("Decompression completed");
  } catch (error) {
    //TODO: change error
    console.error("Decompression failed:", error);
  }
};

await decompress();
