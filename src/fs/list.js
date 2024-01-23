import fs from "node:fs/promises";
import path from "node:path";

const folderPath = path.join("src/fs/files");

const list = async () => {
  try {
    const files = await fs.readdir(folderPath);

    console.log(files);
  } catch {
    throw new Error("FS operation failed");
  }
};

await list();
