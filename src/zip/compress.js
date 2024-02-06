import zlib from "zlib";
import fs from "fs";
import { pipeline } from "stream/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToCompress = join(__dirname, "files", "fileToCompress.txt");
const compressedFile = join(__dirname, "files", "archive.gz");

const compress = async () => {
  const readStream = fs.createReadStream(fileToCompress);
  const gzipStream = zlib.createGzip();
  const writeStream = fs.createWriteStream(compressedFile);

  try {
    await pipeline(readStream, gzipStream, writeStream);
    console.log("Compression completed");
  } catch (error) {
    //TODO: change error
    console.error("Compression failed:", error);
  }
};

await compress();
