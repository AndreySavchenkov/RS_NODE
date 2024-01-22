import fs from "node:fs/promises";
import path from "node:path";

const newFolderName = "files_copy";
const folderPath = path.join("src/fs/files");
const folderPathForCopy = path.join("src/fs", newFolderName);

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
        await fs.copyFile(`${folderPath}/${file}`, `${folderPathForCopy}/${file}`);
      });

      console.log('Files copied successfully');
    } else {
      throw error;
    }
  }
};

await copy();
