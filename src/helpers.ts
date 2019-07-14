export function deepCopy(object: any) {
  return JSON.parse(JSON.stringify(object));
}

export function handleFloatNumbers(number: number) {
  if (!Number.isInteger(number)) {
    const roundedNumber = Math.round(number);
    let isRoundedNumberHigher = true;
    if (roundedNumber < number) {
      isRoundedNumberHigher = false;
    }

    return { roundedNumber, isRoundedNumberHigher};
  }
}