import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {messageFieldChangeActionCreator, messageSendButtonActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
        dialogsElements:
            state.dialogsPage.dialogs.map(dialog => <DialogItem ava={dialog.ava}
                                                                name={dialog.name}
                                                                id={dialog.id}
                                                                key={dialog.id}/>),
        messagesElements:
            state.dialogsPage.dialogs[0].messages.map(message => <Message message={message}
                                                                          key={message.id}/>)
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        messageSendButton: (scrollToBottom) => {
            dispatch(messageSendButtonActionCreator());
            scrollToBottom();
        },

        messageFieldChange: (text) => {
            dispatch(messageFieldChangeActionCreator(text));
        }
    };
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs);
