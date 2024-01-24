import zlib from "zlib";
import fs from "fs";
import { pipeline } from "stream/promises";

const fileToCompress = "src/zip/files/fileToCompress.txt";
const compressedFile = "src/zip/files/archive.gz";

const compress = async () => {
  const readStream = fs.createReadStream(fileToCompress);
  const gzipStream = zlib.createGzip();
  const writeStream = fs.createWriteStream(compressedFile);

  try {
    await pipeline(readStream, gzipStream, writeStream);
    console.log("Compression completed");
  } catch (error) {
    console.error("Compression failed:", error);
  }
};

await compress();
