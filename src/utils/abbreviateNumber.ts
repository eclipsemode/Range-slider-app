function abbreviateNumber(max: number, min: number, percent: number) {
    let newValue: number | string = max * percent / 100;

    newValue > 10000000 ? newValue = newValue.toPrecision(1) : null;

    return String(newValue);
}

export default abbreviateNumber;