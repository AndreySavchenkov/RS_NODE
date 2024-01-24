import fs from "node:fs/promises";
import path from "node:path";

const pathToFile = path.join("src/fs/files/fileToRead.txt");

const read = async () => {
  try {
    const content = await fs.readFile(pathToFile, { encoding: "utf8" });
    console.log(content);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
