import { deepCopy, handleFloatNumbers } from './helpers';

export function nearestNumbers(number: number, excludedNumbers: Array<number>, min: number, max: number) {
  const initialNumber = deepCopy(number);
  let higherNumber = number + 1;
  let lowerNumber = number - 1;

  let canBeLower = true;
  let canBeHigher = true;
  let lastActionNumberIncreased = false;

  const handleFloatNumbersResult = handleFloatNumbers(number);
  if (handleFloatNumbersResult) {
    number = handleFloatNumbersResult.roundedNumber;
    if (handleFloatNumbersResult.isRoundedNumberHigher) {
      higherNumber = number;
      lowerNumber = number - 1;
    } else {
      higherNumber = number + 1;
      lowerNumber = number;
    }
  }

  // Repeat until we find the number is not in array and until number can be increased or decreased
  while (excludedNumbers.includes(number) && (canBeLower || canBeHigher)) {

    // If last searched number was higher, try to find lower number
    if ((lastActionNumberIncreased || !canBeHigher) && canBeLower) {

      // If lowerNumber can't be lower, than min value, set canBeLower flag to false
      if (lowerNumber > min) {
        number = lowerNumber;
        lowerNumber --;
      } else {
        canBeLower = false;
      }

      // Change flag tracking last executed action
      lastActionNumberIncreased = false;

    // If last searched number was lower, try to find higher number
    } else if ((!lastActionNumberIncreased || !canBeLower) && canBeHigher) {

      // If higherNumber can't be higher, than max value, set canBeHigher flag to false
      if (higherNumber < max) {
        number = higherNumber;
        higherNumber ++;
      } else {
        canBeHigher = false;
      }

      // Change flag tracking last executed action
      lastActionNumberIncreased = true;
    }
  }

  // If searched number can't be lower or higher, it means that the number wasn't found and we're returning initial number
  if (!canBeLower && !canBeHigher) {
    return initialNumber;
  }

  return number;
}