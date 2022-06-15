export const ErrorBorder = (props) => {
    return {
        border: Object.keys(props).length !== 0
            ? '1px solid red'
            : ''
    }
}