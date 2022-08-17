import {profileAPI} from "../api/api";

const ADD_POST = "gsn/profile/ADD-POST";
const SET_USER_PROFILE = "gsn/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "gsn/profile/SET_USER_STATUS";
const CURRENT_PROFILE_AUTH_USER = "gsn/profile/CURRENT_PROFILE_AUTH_USER";
const DELETE_POST = "gsn/profile/DELETE_POST";

let initialState = {
    posts: [
        {id: 1, message: "Hey body, whats wrong???", likesCount: 20},
        {id: 2, message: "Explain me that, what are you want", likesCount: 15},
        {id: 3, message: "I am gaining a power!", likesCount: 50},
        {id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", likesCount: 33}
    ],
    profile: null,
    status: "",
    currentProfileAuthUser: false
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


        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

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

        case CURRENT_PROFILE_AUTH_USER:
            return {
                ...state,
                currentProfileAuthUser: action.currentProfileAuthUser
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

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
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

export const setCurrentProfileAuthUser = (value) => ({
    type: CURRENT_PROFILE_AUTH_USER,
    currentProfileAuthUser: value
})

// Redux-thunk
export const getUserProfile = (userId) => async (dispatch) => {
    const res = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(res));
}

export const getUserStatus = (userId) => async (dispatch) => {
    const res = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(res));
}

export const updateStatus = (status) => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status);

    if (res.resultCode === 0) {
        dispatch(updateUserStatus(status));
    }
}

export const addPost = (post) => (dispatch) => {
    dispatch(addPostActionCreator(post))
}

export default profileReducer;