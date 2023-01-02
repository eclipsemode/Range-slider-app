function convertToNumber(
  value: number,
  sliderWidth: number,
  min: number,
  max: number
): number {
  if (min < 0) {
    return Math.round(min + (value / sliderWidth) * (max - min));
  }
  if (min > 0) {
    return Math.round((value / sliderWidth) * (max - min) + min);
  }
  return Math.round((value / sliderWidth) * max);
}

export default convertToNumber;
