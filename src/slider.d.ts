declare type SliderRangeOptions  = {
    classes: string,
    value?: number,
    step?: number,
    min?: number,
    max?: number,
    horizontal?: boolean;
    length?: number,
    rulersHidden?: boolean,
    tooltip?: boolean,
    percent?: boolean,
    color?: {
        firstColor?: string,
        secondColor?: string,
        textColor?: string,
        thumbColor?: string
    }
}

export {SliderRangeOptions};