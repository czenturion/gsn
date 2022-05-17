import s from "./Dialogs.module.css";
import React, {useRef} from "react";
import Scroll from 'react-scroll';


const Dialogs = (props) => {


    // Автоскролл вниз после отправки сообщения
    let Element = Scroll.Element;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let scrollRef = useRef(null);
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }


    // Отправка сообщений
    let onSend = () => {
        props.messageSendButton(scrollToBottom);
    }

    // Обработка события изменения поля textarea
    let onChangeText = (e) => {
        let text = e.target.value;
        props.messageFieldChange(text);
    }


    return (<div className={s.dialogs}>
        <div className={s.dialogsItems}>
            {props.dialogsElements}
        </div>
        <div className={s.messages}>
            <Element className={s.messagesScroll}>
                {props.messagesElements}
                <div ref={scrollRef} className={s.messagesScrollRef}/>
            </Element>
            <div className={s.sendMessageField}>
                    <textarea onChange={onChangeText}
                              placeholder="Enter a new message"
                              value={props.newMessageText}/>
                <button className={s.btnMessageSend}
                        onClick={onSend}>
                    <h3>S e n d</h3>
                </button>
            </div>
        </div>
    </div>)
};

export default Dialogs;
