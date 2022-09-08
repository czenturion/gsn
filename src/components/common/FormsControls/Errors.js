export const ErrorBorder = (props) => {
    return {
        border: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}

export const ErrorBorderOutline = (props) => {
    return {
        outline: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}