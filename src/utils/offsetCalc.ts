function outNum(start: number, end: number, step: number): any {
    const time = 10000;
    const t = Math.round(time / (end / step));
    const interval = setInterval(() => {
        start = start + step;
        if (start == end) {
            clearInterval(interval);
        }
        return step;
    }, t);
    
    return interval;
}

export default outNum;