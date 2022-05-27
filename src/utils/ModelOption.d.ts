declare type ModelOption  = {
    value?: number,
    valueSecond?: number,
    gap?: number,
    step?: number,
    min?: number,
    max?: number,
    horizontal?: boolean;
    rulersHidden?: boolean,
    range?: boolean,
    tooltip?: {
        display?: boolean,
        percent?: boolean
    },
    color?: {
        firstColor?: string,
        secondColor?: string,
        textColor?: string,
        thumbColor?: string
    }
}

export default ModelOption;