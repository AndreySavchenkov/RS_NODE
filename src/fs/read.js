import fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  try {
    const content = await fs.readFile(pathToFile, { encoding: "utf8" });
    console.log(content);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
