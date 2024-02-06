import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  try {
    const stream = fs.createWriteStream(pathToFile);

    process.stdin.pipe(stream);

    stream.on("error", (error) => {
      console.error(`Error writing: ${error.message}`);
    });

    stream.on("open", () => console.log("Stream Open -->"));
    stream.on("close", () => console.log("<-- Stream Close"));
  } catch (error) {
    console.error(`Error creating write stream: ${error.message}`);
  }
};

await write();
