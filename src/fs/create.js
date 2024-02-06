import fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const fileContent = "I am fresh and young";
const fileName = "fresh.txt";
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "files", fileName);

const create = async () => {
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
