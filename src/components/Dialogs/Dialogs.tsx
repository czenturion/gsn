import s from "./Dialogs.module.css"
import * as React from "react"
import {useRef} from "react"
import Scroll from "react-scroll"
import {SubmitHandler, useForm} from "react-hook-form"
import {ErrorBorder} from "../common/FormsControls/Errors"

type PropsType = {
    dialogsElements: any
    messagesElements: any
    messageSendButton: (message: string, scrollToBottom: () => void) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    // Автоскролл вниз после отправки сообщения
    let Element = Scroll.Element

    let scrollRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }

    return (
        <div
            className={s.dialogs}
        >
            <div
                className={s.dialogsItems}
            >
                {props.dialogsElements}
            </div>
            <div
                className={s.messages}
            >
                <Element
                    className={s.messagesScroll}
                >
                    {props.messagesElements}
                    <div
                        ref={scrollRef}
                        className={s.messagesScrollRef}
                    />
                </Element>
                <AddMessageForm
                    messageSendButton={props.messageSendButton}
                    scrollToBottom={scrollToBottom}
                />
            </div>
        </div>
    )
}

type FormValues = {
    message: string
}
type AddMessageFormType = {
    messageSendButton: (message: string, scrollToBottom: () => void) => void
    scrollToBottom: () => void
}

const AddMessageForm: React.FC<AddMessageFormType> = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        props.messageSendButton(values.message, props.scrollToBottom)
        reset()
    }

    const maxMessageLengthValue = 20

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className={s.error}
            >
                {errors?.message &&
                    <p>{errors?.message?.message}</p>
                }
            </div>
            <div
                className={s.sendMessageField}
            >
                <div
                    className={s.messageField}
                >
                    <input
                        type="textarea"
                        placeholder="Enter a new message"
                        style={ErrorBorder(errors)}
                        {...register("message",
                            {
                                required: true,
                                maxLength: {
                                    value: maxMessageLengthValue,
                                    message: `Max length ${maxMessageLengthValue} symbols`
                                }
                            })}
                    />
                </div>
                <div
                    className={s.btnMessageSend}
                >
                    <input
                        type={"submit"}
                    />
                </div>
            </div>
        </form>
    )
}

export default Dialogs
