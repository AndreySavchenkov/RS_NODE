import zlib from "zlib";
import fs from "fs";
import { pipeline } from "stream/promises";

const compressedFile = "src/zip/files/archive.gz";
const decompressedFile = "src/zip/files/decompressedFile.txt";

const decompress = async () => {
  const readStream = fs.createReadStream(compressedFile);
  const writeStream = fs.createWriteStream(decompressedFile);
  const gunzipStream = zlib.createGunzip();

  try {
    await pipeline(readStream, gunzipStream, writeStream);
    console.log("Decompression completed");
  } catch (error) {
    console.error("Decompression failed:", error);
  }
};

await decompress();
