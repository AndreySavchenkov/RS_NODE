import fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const newFolderName = "files_copy";
const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = join(__dirname, "files");
const folderPathForCopy = join(__dirname, newFolderName);

const copy = async () => {
  try {
    await fs.access(folderPath);
    await fs.access(folderPathForCopy);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(folderPathForCopy, { recursive: true });

      const files = await fs.readdir(folderPath);

      files.map(async (file) => {
        await fs.copyFile(
          `${folderPath}/${file}`,
          `${folderPathForCopy}/${file}`
        );
      });

      console.log("Files copied successfully");
    } else {
      throw error;
    }
  }
};

await copy();
