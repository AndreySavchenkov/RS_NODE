import fs from "node:fs/promises";
import path from "node:path";

const fileContent = "I am fresh and young";
const folderPath = "src/fs/files";
const fileName = "fresh.txt";

const create = async () => {
  const filePath = path.join(folderPath, fileName);

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, fileContent);
      console.log(`File created successfully: ${fileName}`);
    } else {
      throw error;
    }
  }
};

await create();
