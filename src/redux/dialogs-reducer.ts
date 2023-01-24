const SEND_MESSAGE = "gsn/dialogs/SEND-MESSAGE"

export type DialogsElementsMessageType = {
    id: number
    sender: string
    message: string
}
export type DialogsElementsType = {
    id: number
    name: string
    ava: string
    messages: DialogsElementsMessageType[]
}
export type DialogsInitialStateType = {
    dialogs: DialogsElementsType[]
}
const initialState = {
    dialogs: [
        {
            id: 1, name: "Lora", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922748.png",
            messages: [
                {id: 1, sender: "u", message: "Hi!"},
                {id: 2, sender: "u", message: "How is going?"},
                {id: 3, sender: "u", message: "Where are you?"},
                {id: 4, sender: "u", message: "Call me back"},
                {id: 5, sender: "f", message: "Hello"},
                {id: 6, sender: "f", message: "I were busy"},
                {id: 7, sender: "f", message: "Gonna home"},
                {id: 8, sender: "f", message: "Okay"},
                {id: 9, sender: "u", message: "Dont forget to buy a milk"},
                {id: 10, sender: "u", message: "And some fruits"}
            ]
        },
        {
            id: 2, name: "Mom", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922558.png",
            messages: []
        },
        {
            id: 3, name: "Dad", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
            messages: []
        },
        {
            id: 4, name: "Irina", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922753.png",
            messages: []
        },
        {
            id: 5, name: "Adam", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
            messages: []
        },
        {
            id: 6, name: "Mara", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922514.png",
            messages: []
        },
        {
            id: 7, name: "Sanchez", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922547.png",
            messages: []
        }
    ]
}

const dialogsReducer = (state = initialState, action: any): DialogsInitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let stateCopy = {
                ...state,
                dialogs: [...state.dialogs]
            }

            stateCopy.dialogs[0] = {...state.dialogs[0]}

            stateCopy.dialogs[0].messages = [...stateCopy.dialogs[0].messages, {
                id: state.dialogs[0].messages.length + 1,
                sender: "u",
                message: action.message
            }]
            return stateCopy
        }
        default:
            return state
    }
}

// Отправка и обновление сообщения
type MessageSendButtonActionCreatorActionType = {
    type: typeof SEND_MESSAGE
    message: string
}
export const messageSendButtonActionCreator = (message: string): MessageSendButtonActionCreatorActionType => ({
    type: SEND_MESSAGE,
    message: message
})

export default dialogsReducer