import { Worker } from "worker_threads";
import { MAX, NUMBER_OF_WORKER } from "./constants";

function create_worker(
  i: number,
  max: number,
  numberOfWorker: number
): Promise<number[]> {
  return new Promise((resolve, reject) => {
    let start = Math.floor(max / numberOfWorker) * i + 1;
    let end = Math.floor(max / numberOfWorker) * (i + 1);

    const worker = new Worker("./src/worker.ts", {
      workerData: { min: start, max: end },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

function run_process() {
  let primes: number[] = [];
  let max: number = MAX;
  let numberOfWorker: number = NUMBER_OF_WORKER;

  if (max === 0 || numberOfWorker === 0) {
    return;
  }
  if (max / numberOfWorker < 2) {
    numberOfWorker = 1;
  }

  const promises: Promise<number[]>[] = [];

  for (let i = 0; i < numberOfWorker; i++) {
    promises.push(create_worker(i, max, numberOfWorker));
  }

  Promise.all(promises)
    .then(function (results: number[][]) {
      results.forEach((result: number[]) => {
        primes = primes.concat(result);
      });
      const message = "Prime is : " + primes.join(" ");
      console.log(message);
      console.log("Number of primes :", primes.length);
    })
    .catch((error) => {
      console.error(error);
    });
}

run_process();
