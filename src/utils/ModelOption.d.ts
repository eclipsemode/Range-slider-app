declare type ModelOption  = {
    from?: number,
    to?: number,
    gap?: number,
    step?: number,
    min?: number,
    max?: number,
    vertical?: boolean;
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
    },
    configPanel?: boolean,
    controlConfig?: string[],
    toggleConfig?: string[],
    progress?: boolean
}

export default ModelOption;