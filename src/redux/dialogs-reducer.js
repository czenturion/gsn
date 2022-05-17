const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
    dialogs: [
        {
            id: 1, name: "Lora", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922748.png",
            messages: [
                {id: 1, sender: "u", message: "Hi darling!"},
                {id: 2, sender: "u", message: "I love you so much"},
                {id: 3, sender: "u", message: "How is going, dear?"},
                {id: 4, sender: "u", message: "love"},
                {id: 5, sender: "u", message: "dear"},
                {id: 6, sender: "f", message: "Dear"},
                {id: 7, sender: "f", message: "Hi cuty"},
                {id: 8, sender: "f", message: "I so miss u"},
                {id: 9, sender: "f", message: "Absolutely well, r u how?"},
                {id: 10, sender: "u", message: "As well, love"},
                {id: 11, sender: "u", message: "And i too missed u so much"},
                {id: 12, sender: "u", message: "Beloved sun"}
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
    ],
    newMessageText: ""
};

const dialogsReducer = (state = initialState, action) => {

    let stateCopy;

    switch (action.type) {

        case SEND_MESSAGE: {

            let newText = state.newMessageText;
            stateCopy = {
                ...state,
                newMessageText: "",
                dialogs: [...state.dialogs],
            };
            stateCopy.dialogs[0] = {...state.dialogs[0]};
            stateCopy.dialogs[0].messages = [...stateCopy.dialogs[0].messages, {
                id: state.dialogs[0].messages.length + 1,
                sender: "u",
                message: newText
            }];
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText
            };
        }
        default:
            return state;
    }
}


// Отправка и обновление сообщения
export const messageSendButtonActionCreator = () => ({type: SEND_MESSAGE})

export const messageFieldChangeActionCreator = (newMessageText) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: newMessageText
})


export default dialogsReducer;