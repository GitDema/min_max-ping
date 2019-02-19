/**
 * The "mean" is the "average" you're used to, where you add up all the numbers
 * and then divide by the number of numbers.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated average (or mean) value from the specified numbers.
 */
export function mean(numbers) {
  let total = 0,
    i;
  for (i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return total / numbers.length;
}

/**
 * The "median" is the "middle" value in the list of numbers.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated median value from the specified numbers.
 */
export function median(numbers) {
  let median = 0,
    numsLen = numbers.length;
  numbers.sort();

  if (numsLen % 2 === 0) {
    // average of two middle numbers
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    // middle number only
    median = numbers[(numsLen - 1) / 2];
  }

  return median;
}

/**
 * The "mode" is the number that is repeated most often.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 */
export function mode(numbers) {
  let modes = [],
    count = [],
    i,
    number,
    maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}

/**
 * The "rand" is the random value in the range of numbers.
 *
 * @param {Number} min An minimal value of range.
 * @param {Number} max An minimal value of range.
 * @return {Number} The number of the specified range.
 */
export function rand(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

/**
 * The "standardDeviation" is a measure that is used to quantify
 * the amount of variation.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The number of the specified numbers.
 */
export function standardDeviation(mean, numbers) {
  return Math.sqrt(
    numbers.reduce(function(sq, n) {
      return sq + Math.pow(n - mean, 2);
    }, 0) /
      (numbers.length - 1)
  );
}
