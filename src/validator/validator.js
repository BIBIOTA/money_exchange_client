export const checkIsIntegerGreaterThanZero = (v) => {
  const number = parseInt(v, 10);

  if (isNaN(number)) {
    return false;
  }

  if (number < 0) {
    return false;
  }

  return number >= 0;
}

/*
@keycode(96 ~ 105) = KP_0~KP_9
@keycode(48 ~ 57) = 0~9
@keycode(8) = BackSpace
@keycode(38) = Up
@keycode(40) = Down
@keycode(190) = .
*/
export const inputNumberDistinct = (e) => {
  if(!((e.keyCode > 95 && e.keyCode < 106)
    || (e.keyCode > 47 && e.keyCode < 58) 
    || e.keyCode == 8
    || e.keyCode == 38
    || e.keyCode == 40
    || (e.keyCode == 190))) {
      e.target.value = '';
  }
}

export const NumberEPSILON = (value) => {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}
