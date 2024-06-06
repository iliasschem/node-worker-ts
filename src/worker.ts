import { parentPort, workerData } from "worker_threads";

function generatePrimes(start: number, end: number) {
  const primes: number[] = [];
  let isPrime: boolean = true;

  if (start === 1) {
    primes.push(start);
    start++;
  }

  for (let i = start; i <= end; i++) {
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;

        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
  return primes;
}

let result = generatePrimes(workerData.min, workerData.max);

if (result.length > 0) {
  parentPort?.postMessage(result);
}
