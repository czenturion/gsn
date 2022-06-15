import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

let initialState = {
    posts: [
        {id: 1, message: "Hey body, whats wrong???", likesCount: 20},
        {id: 2, message: "Explain me that, what are you want", likesCount: 15},
        {id: 3, message: "I am gaining a power!", likesCount: 50},
        {id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", likesCount: 33}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let text = action.post;
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    message: text,
                    likesCount: 0
                }]
            };


        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state;
    }
}


// Actions
// Отправка и обновление поста
export const addPostActionCreator = (post) => ({
    type: ADD_POST,
    post
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
});

export const updateUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
});

// Redux-thunk
export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId).then(res => {
            dispatch(setUserProfile(res));
        })
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId).then(res => {
            dispatch(setUserStatus(res));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status).then(res => {
            if (res.resultCode === 0) {
                dispatch(updateUserStatus(status));
            }
        })
    }
}


export default profileReducer;