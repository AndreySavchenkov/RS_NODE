import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToScript = join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [pathToScript, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.on("data", (data) => {
    child.stdin.write(data);
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  child.on("error", (data) => {
    console.error(`Error: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(1);
  });
};

spawnChildProcess(["argument_1", "argument_2", "argument_3"]);
