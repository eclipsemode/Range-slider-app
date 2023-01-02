function convertToPixel(
  value: number,
  sliderWidth: number,
  min: number,
  max: number
): number {
  if (min < 0) {
    const newMax: number = max + Math.abs(min);
    const newValue: number = value + Math.abs(min);
    return (newValue / newMax) * sliderWidth;
  }
  if (min > 0) {
    const newMax: number = max - min;
    const newValue: number = value - min;
    return (newValue / newMax) * sliderWidth;
  }
  return (value / max) * sliderWidth;
}

export default convertToPixel;
