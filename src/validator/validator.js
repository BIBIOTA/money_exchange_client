export const checkIsIntegerGreaterThanZero = (v) => {
  const number = parseInt(v, 10);

  if (isNaN(number)) {
    return false;
  }

  return number >= 0;
}

export const NumberEPSILON = (value) => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}
