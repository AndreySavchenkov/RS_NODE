import fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const fileName = "fileToRemove.txt";
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "files");

const remove = async () => {
  try {
    await fs.unlink(`${filePath}/${fileName}`);
    console.log("File removed successful!");
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
