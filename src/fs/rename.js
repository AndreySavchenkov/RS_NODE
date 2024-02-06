import fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const oldFileName = "wrongFilename.txt";
const newFileName = "properFilename.md";
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "files");

const rename = async () => {
  try {
    await fs.access(`${filePath}/${newFileName}`);
    throw new Error("FS operation failed: File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fs.access(`${filePath}/${oldFileName}`);
      } catch (error) {
        throw new Error("FS operation failed: File not found");
      }

      await fs.rename(
        `${filePath}/${oldFileName}`,
        `${filePath}/${newFileName}`
      );
      console.log("File renamed successfully!");
    } else {
      console.log(error);
    }
  }
};

await rename();
