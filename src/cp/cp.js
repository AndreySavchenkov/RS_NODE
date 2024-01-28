import { spawn } from "child_process";

const spawnChildProcess = async (args) => {
  const child = spawn("node", ["src/cp/files/script.js", ...args], {
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
