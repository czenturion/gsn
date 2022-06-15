export const ErrorBorder = (props) => {
    return {
        outline: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}