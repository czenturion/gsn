import Message from "./Message/Message"
import DialogItem from "./DialogItem/DialogItem"
import {messageSendButtonActionCreator} from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import * as React from "react"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"

type MapStateToPropsType = {
    dialogsElements: any
    messagesElements: any
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsElements: state.dialogsPage.dialogs.map(d => <DialogItem ava={d.ava} name={d.name} id={d.id} key={d.id}/>),
        messagesElements: state.dialogsPage.dialogs[0].messages.map(m => <Message message={m} key={m.id}/>)
    }
}

type MapDispatchToPropsType = {
    messageSendButton: (message: string, scrollToBottom: () => void) => void
}
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        messageSendButton: (message, scrollToBottom) => {
            dispatch(messageSendButtonActionCreator(message))
            scrollToBottom()
        }
    }
}

export default compose<React.Component>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)
