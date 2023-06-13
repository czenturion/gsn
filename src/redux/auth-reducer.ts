import {ResultCodesEnum} from "../api/api"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"
import {UseFormSetError} from "react-hook-form"
import {FormValues} from "../components/Login/Login"
import {authAPI} from "../api/authAPI"
import {securityAPI} from "../api/securityAPI"

const SET_USER_DATA = "gsn/auth/SET_USER_DATA"
const TOGGLE_IS_FETCHING = "gsn/auth/TOGGLE_IS_FETCHING"
const SET_CAPTCHA = "gsn/auth/SET_CAPTCHA"

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captcha: ""
}

export type InitialAuthStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialAuthStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }

        default:
            return state
    }
}

// actions
type ActionTypes = SetIsFetchingActionType | SetAuthUserDataActionType |
    SetCaptchaActionType

type SetIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type SetAuthUserDataActionDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataActionDataType
}

const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
})

type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA
    captcha: string
}

const setCaptcha = (captcha: string): SetCaptchaActionType => ({
    type: SET_CAPTCHA,
    captcha
})

// thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

const {Success, Error, CaptchaIsRequired} = ResultCodesEnum

export const getAuthUserData = (): ThunkType => async dispatch => {
    dispatch(setIsFetching(true))
    const res = await authAPI.me()

    if (res.resultCode === Success) {
        const {id, email, login} = res.data
        dispatch(setAuthUserData(id, email, login, true))
    }
    dispatch(setIsFetching(false))
}

export const logIn = (logData: FormValues, setError: UseFormSetError<FormValues>): ThunkType => async dispatch => {
    dispatch(setIsFetching(true))
    const {messages, resultCode} = await authAPI.login(logData)
    if (resultCode === Success) {
        await dispatch(getAuthUserData())
        dispatch(setCaptcha(""))
    }
    if (resultCode === Error) {
        setError("serverResponse", {type: "server", message: messages[0]})
    }
    if (resultCode === CaptchaIsRequired) {
        setError("serverResponse", {type: "server", message: messages[0]})
        const res = await securityAPI.getCaptchaUrl()
        dispatch(setCaptcha(res.url))
    }
    dispatch(setIsFetching(false))
}

export const logOut = (): ThunkType => async dispatch => {
    dispatch(setIsFetching(true))
    const res = await authAPI.logout()

    if (res.resultCode === Success) {
        dispatch(setAuthUserData(null, null, null, false))
    } else {
        console.log(res)
    }

    dispatch(setIsFetching(false))
}

export default authReducer