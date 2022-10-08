type ReturnedValueType = {
    border?: string
    outline?: string
}

export const ErrorBorder = (props: any): ReturnedValueType => {
    return {
        border: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}

export const ErrorBorderOutline = (props: any): ReturnedValueType => {
    return {
        outline: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}