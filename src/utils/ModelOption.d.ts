declare type ModelOption  = {
    from?: number,
    to?: number,
    gap?: number,
    step?: number,
    min?: number,
    max?: number,
    vertical?: boolean;
    rulers?: boolean,
    range?: boolean,
    tooltip?: boolean,
    percent?: boolean,
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