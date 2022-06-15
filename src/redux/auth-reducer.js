import {authAPI} from "../api/api"

const SET_USER_DATA = "SET_USER_DATA"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_CAPTCHA = "SET_CAPTCHA"

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captcha: ""
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }

        default:
            return state;
    }
}

// actions

export const setIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
});

const setCaptcha = (captcha) => ({
    type: SET_CAPTCHA,
    captcha
})

// thunks
export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.resultCode === 0) {
                let {id, email, login} = res.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
}

export const logIn = (logData, setError) => (dispatch) => {
    authAPI.login(logData)
        .then(res => {
            let {messages, resultCode} = res

            if (resultCode === 0) {
                dispatch(getAuthUserData())
                dispatch(setCaptcha(""))
            }
            if (resultCode === 1) {
                setError("serverResponse", {type: "server", message: messages[0]})
            }
            if (resultCode === 10) {
                setError("serverResponse", {type: "server", message: messages[0]})
                authAPI.captcha().then(res => {
                    dispatch(setCaptcha(res.url))
                })
            }
        })
}

export const logOut = () => (dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
}


export default authReducer;