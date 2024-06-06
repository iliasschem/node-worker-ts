// Remark: if min equal to 1 the code doesn't work
const min = 2;

// Remark: there was an issue if max equal 6 the result will include 7, this is always true if we choose max=primeNumber-1  
const max = 1e7;

const primes = [];

function generatePrimes(start, range) {
  let isPrime = true;

  let end = start + range;
  for (let i = start; i < end; i++) {
    //Remark: we can use <=Math.sqrt(i) instead of Math.sqrt(end) to improve the code
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;

        break;
      }
    }

    if (isPrime) {
      console.log("i :", i);
      primes.push(i);
    }

    isPrime = true;
  }
}

generatePrimes(min, max);

const message = "Prime is : " + primes.join(" ");

console.log(message);
console.log("Number of primes :", primes.length);
