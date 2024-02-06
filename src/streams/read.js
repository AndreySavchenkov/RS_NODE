import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, "files", "fileToRead.txt");

const read = async (filename) => {
  const readStream = fs.createReadStream(filename);

  readStream.on("error", (err) => console.log(`Something error: ${err}`));
  readStream.on("open", () => console.log("\nOpen writable stream -->"));
  readStream.on("end", () => console.log("\n<-- Close writable stream"));

  readStream.pipe(process.stdout);
};

await read(pathToFile);
