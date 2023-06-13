import s from "./../Dialogs.module.css"
import * as React from "react"

type MessageType = {
    sender: string
    message: string
}

type PropsType = {
    message: MessageType
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.message} style={{
            textAlign: props.message.sender === "u" ? 'right' : 'left'
        }}>
            {props.message.message}
        </div>
    )
}

export default Message
