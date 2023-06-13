import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const INITIALIZED_SUCCESS = "gsn/app/INITIALIZED_SUCCESS"

const initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

// actions
const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
})

// thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccessActionType>

export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}


export default appReducer