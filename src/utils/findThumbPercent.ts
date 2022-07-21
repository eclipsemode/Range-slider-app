function findMinPercent(min: number, value: number, maxAttr: number): string {
    return min > 0
            ? ((value - min) / (maxAttr - min)) * 100 + '%'
        : min < 0
            ? ((value + Math.abs(min)) / (maxAttr + Math.abs(min))) * 100 + '%'
        : (value / maxAttr) * 100 + '%';
}

function findMaxPercent(min: number, value: number, maxAttr: number): string {
    return min > 0
            ? 100 - ((value - min) / (maxAttr - min) * 100) + '%'
        : min < 0
            ? 100 - ((value + Math.abs(min)) / (maxAttr + Math.abs(min)) * 100) + '%'
        : (100 - (value / maxAttr) * 100) + '%';
}

export {findMinPercent, findMaxPercent};