import s from "./../Dialogs.module.css";

const Message = (props) => {
    return (
        <div className={s.message} style={{
            textAlign: props.message.sender === "u" ? 'right' : 'left'
        }}>
            {props.message.message}
        </div>
    )
}

export default Message;
