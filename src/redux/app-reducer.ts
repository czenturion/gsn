import {getAuthUserData} from "./auth-reducer"

const INITIALIZED_SUCCESS = "gsn/app/INITIALIZED_SUCCESS"

const initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialStateType => {

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
export const initializeApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}


export default appReducer