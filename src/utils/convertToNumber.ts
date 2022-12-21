function convertToNumber(
  mouseOffset: number,
  sliderWidth: number,
  min: number,
  max: number
): number {
  if (min < 0) {
    return Math.round(min + (mouseOffset / sliderWidth) * (max - min));
  }
  if (min > 0) {
    return Math.round((mouseOffset / sliderWidth) * (max - min) + min);
  }
  return Math.round((mouseOffset / sliderWidth) * max);
}

export default convertToNumber;
