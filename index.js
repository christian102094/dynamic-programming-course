const { performance } = require("perf_hooks");

// memoize
function memofibonacci(n, memo = {}) {
  if (n <= 1) {
    return n;
  }
  if (n in memo) {
    return memo[n];
  }
  return (memo[n] = memofibonacci(n - 1, memo) + memofibonacci(n - 2, memo));
}

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log(fibonacci(5));
// console.log(fibonacci(6));
// console.log(fibonacci(7));
// console.log(fibonacci(50));
// console.log(memofibonacci(50));

function gridTravelerMemo(m, n, cache = {}) {
  // console.log(`call {${m},${n}}`);
  const cachedVal = cache[`${m}.${n}`];
  if (cachedVal) {
    return cachedVal;
  }
  if (m < 1 || n < 1) {
    return 0;
  }
  if (m == 1 && n == 1) {
    return 1;
  }

  return (cache[`${m}.${n}`] = cache[`${n}.${m}`] =
    gridTravelerMemo(m - 1, n, cache) + gridTravelerMemo(m, n - 1, cache));
}

function gridTraveler(m, n) {
  // console.log(`call {${m},${n}}`);
  if (m < 1 || n < 1) {
    return 0;
  }
  if (m == 1 && n == 1) {
    return 1;
  }
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
}

function gridTravelerFormatted(m, n) {
  console.log(`--------\ngridTravelerMemo {${m},${n}}:`);
  console.log(gridTravelerMemo(m, n));
  console.log(`--------\ngridTraveler {${m},${n}}:`);
  console.log(gridTraveler(m, n));
}

// gridTravelerFormatted(0, 0);
// gridTravelerFormatted(0, 1);
// gridTravelerFormatted(1, 1);
// gridTravelerFormatted(1, 2);
// gridTravelerFormatted(2, 2);
// gridTravelerFormatted(2, 3);
// gridTravelerFormatted(100, 12);

function canSumMemo(n, arr, memo = {}) {
  if (n in memo) return memo[n];
  if (n < 0) {
    return false;
  } else if (n === 0) {
    return true;
  }

  for (let el of arr) {
    if (canSumMemo(n - el, arr, memo)) {
      memo[n] = true;
      return true;
    }
  }

  memo[n] = false;
  return false;
}
function canSum(n, arr) {
  if (n < 0) {
    return false;
  } else if (n === 0) {
    return true;
  }

  for (let el of arr) {
    if (canSum(n - el, arr)) {
      return true;
    }
  }

  return false;
}

function canSumFormatted(n, arr) {
  console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  console.log(canSumMemo(n, arr));
  console.log(`--------\ncanSum {${n},${arr}}:`);
  console.log(canSum(n, arr));
}

// canSumFormatted(1, 2);
// canSumFormatted(2, 2);
// canSumFormatted(2, 3);
// canSumFormatted(270, [7, 14]);

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });

function howSum(targetSum, numbers, solution = []) {
  // console.log(
  //   `---\ntargetSum=${targetSum}, numbers=${numbers}, solution=${solution}`
  // );
  if (targetSum < 0) {
    // console.log(`< 0 => descarted`);
    return { status: false, solution: [] };
  } else if (targetSum === 0) {
    // console.log(solution);
    return { status: true, solution: solution };
  }

  for (let el of numbers) {
    // console.log(`targetSum - el= ${targetSum} - ${el}`);
    const tmpSol = howSum(targetSum - el, numbers, [...solution, el]);
    if (tmpSol.status) {
      console.log(`solution:`, solution);
      return { status: true, solution: tmpSol.solution };
    }
  }

  return { status: false, solution: [] };
}

function howSumFormatted(n, arr) {
  // console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  // console.log(canSumMemo(n, arr));
  console.log(`--------\nhowSum {${n},${arr}}:`);
  console.log(howSum(n, arr));
}

// howSumFormatted(11, [4, 5, 7]);
// howSumFormatted(7, [5, 3, 4, 7]);
// howSumFormatted(8, [5, 3, 5]);
// howSumFormatted(7, [1]);
// howSumFormatted(0, [1, 2, 3]);
// howSumFormatted(4, [5, -1]);
// howSumFormatted(300, [7, 14]);

function bestSum(targetSum, numbers, solution = []) {
  console.log(
    `\n-(bestSum)\ntargetSum=${targetSum}, numbers=${numbers}, solution=${solution}`
  );

  if (targetSum < 0) {
    console.log(`< 0 => descarted`);
    return { status: false, solution: [] };
  } else if (targetSum === 0) {
    console.log("targetSum = 0");
    return { status: true, solution: solution };
  }

  let bestSolution = [];

  for (let el of numbers) {
    console.log(`--(for)targetSum - el= ${targetSum} - ${el}`);
    const tmpSol = bestSum(targetSum - el, numbers, [...solution, el]);
    if (
      bestSolution.length === 0 ||
      (tmpSol.solution.length < bestSolution.length &&
        tmpSol.solution.length > 0)
    ) {
      bestSolution = tmpSol.solution;
      console.log(`new bestSolution:`, bestSolution);
    }
  }

  return {
    status: bestSolution.length > 0,
    solution: bestSolution,
  };
}

function bestSumFormatted(n, arr) {
  // console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  // console.log(canSumMemo(n, arr));
  console.log(`--------\nbestSum {${n},${arr}}:`);
  console.log(bestSum(n, arr));
}

// bestSumFormatted(8, [2, 3, 5]);
// bestSumFormatted(8, [1]);
// bestSumFormatted(300, [7, 14]);

function canConstruct(target, parts) {
  if (target === "") {
    return true;
  }

  for (let part of parts) {
    if (target.startsWith(part)) {
      let result = canConstruct(target.slice(part.length), parts);
      if (result) {
        return true;
      }
    }
  }

  return false;
}

function canConstructFormatted(target, parts) {
  // console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  // console.log(canSumMemo(n, arr));
  const t0 = performance.now();
  console.log(`--------\ncanConstruct {${target},${parts}}:`);
  console.log(canConstruct(target, parts));
  const t1 = performance.now();
  console.log((t1 - t0) / 1000, "seconds");
}

// canConstructFormatted("abcdef", ["ab", "abc", "cd", "def", "abcd"]);
// canConstructFormatted("skateboard", [
//   "bo",
//   "rd",
//   "ate",
//   "t",
//   "ska",
//   "sk",
//   "boar",
// ]);
// canConstructFormatted("eeeeeeeeeeeeeeeeeeeeeeeeef", [
//   "e",
//   "ee",
//   "eee",
//   "eeee",
//   "eeeee",
//   "eeeeee",
// ]);

function countConstruct(target, parts) {
  if (target === "") {
    return 1;
  }
  let count = 0;
  for (let part of parts) {
    if (target.startsWith(part)) {
      let result = countConstruct(target.slice(part.length), parts);
      count = count + result;
    }
  }

  return count;
}

function countConstructFormatted(target, parts) {
  // console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  // console.log(canSumMemo(n, arr));
  const t0 = performance.now();
  console.log(`--------\ncountConstruct {${target},${parts}}:`);
  console.log(countConstruct(target, parts));
  const t1 = performance.now();
  console.log((t1 - t0) / 1000, "seconds");
}

// countConstructFormatted("abcdef", ["ab", "abc", "cd", "def", "abcd"]);
// countConstructFormatted("skateboard", [
//   "bo",
//   "rd",
//   "ate",
//   "t",
//   "ska",
//   "sk",
//   "boar",
// ]);
// countConstructFormatted("abcdef", ["ab", "abc", "cdef", "def", "abcdef"]);

function allConstruct(target, parts) {
  if (target === "") {
    return [[]];
  }

  let solutions = [];
  for (let part of parts) {
    if (target.startsWith(part)) {
      let result = allConstruct(target.slice(part.length), parts);
      result.forEach((x) => x.unshift(part));
      solutions.push(...result);
    }
  }

  return solutions;
}

function allConstructFormatted(target, parts) {
  // console.log(`--------\ncanSumMemo {${n},${arr}}:`);
  // console.log(canSumMemo(n, arr));
  const t0 = performance.now();
  console.log(`--------\nallConstruct {${target},${parts}}:`);
  console.log(allConstruct(target, parts));
  const t1 = performance.now();
  console.log((t1 - t0) / 1000, "seconds");
}

// allConstructFormatted("abcdef", ["ab", "abc", "cdef", "def", "abcdef"]);
// allConstructFormatted("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]);

function fibonacciTab(n) {
  let arr = Array(n + 1).fill(0);
  arr[1] = 1;

  for (let i = 0; i <= n; i++) {
    arr[i + 1] += arr[i];
    arr[i + 2] += arr[i];
  }
  return arr[n];
}

console.log(fibonacciTab(5));
console.log(fibonacciTab(6));
console.log(fibonacciTab(7));
console.log(fibonacciTab(50));
