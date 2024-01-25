import { Worker } from "worker_threads";
import os from "os";

const numCPUs = os.cpus().length;

const createWorker = async (id) => {
  return new Promise((resolve, reject) => {
    //TODO: refactor path
    const worker = new Worker("./src/wt/worker.js", { workerData: id });

    worker.on("message", (message) => {
      console.log(`Received result from Worker ${id}:`, message);
      resolve(message);
    });

    worker.on("error", (error) => {
      console.error(`Error in Worker ${id}:`, error);
      reject({ status: "error", data: null });
    });
  });
};

const performCalculations = async () => {
  const workerPromises = [];

  for (let i = 0; i < numCPUs; i++) {
    const inputData = 10 + i;
    workerPromises.push(createWorker(inputData));
  }

  try {
    const results = await Promise.all(workerPromises);
    console.log("All workers finished. Results:", results);
  } catch (error) {
    console.error("Error in one or more workers:", error);
  }
};

await performCalculations();
