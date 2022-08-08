function abbreviateNumber(max: number, min: number, percent: number) {
    let newValue: number;

    if (percent === 0) {
        newValue = min;
        return String(newValue).length > 8 ? String(newValue.toPrecision(1)) : String(newValue);
    } else if (percent === 100) {
        newValue = max;
        return String(newValue).length > 8 ? String(newValue.toPrecision(1)) : String(newValue);
    } else {

        if (min < 0) {
            newValue = ((max + Math.abs(min)) / 100 * percent) - Math.abs(min);
            return String(newValue).length > 8 ? String(newValue.toPrecision(1)) : String(newValue);
        } else if (min > 0) {
            newValue = ((max - min) / 100 * percent) + min;
            return String(newValue).length > 8 ? String(newValue.toPrecision(1)) : String(newValue);
        } else {
            newValue = max / 100 * percent;
            return String(newValue).length > 8 ? String(newValue.toPrecision(1)) : String(newValue);
        }

    }
}

export default abbreviateNumber;