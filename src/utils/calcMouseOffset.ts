function calcMouseOffset(mouseOffset: number, sliderWidth: number): number {
  if (mouseOffset < 0) {
    return 0;
  }
  if (mouseOffset > sliderWidth) {
    return sliderWidth;
  }
  return mouseOffset;
}

export default calcMouseOffset;
