declare type ModelOption  = {
    value?: number,
    step?: number,
    min?: number,
    max?: number,
    horizontal?: boolean;
    rulersHidden?: boolean,
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