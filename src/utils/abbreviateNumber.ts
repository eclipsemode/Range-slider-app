function abbreviateNumber(max: number, percent: number) {
    let newValue: number | string;

    (max * percent / 100) > 10000000
        ? newValue = String((max * percent / 100).toPrecision(5))
        : newValue = String(max * percent / 100);

    return newValue;
}

export default abbreviateNumber;