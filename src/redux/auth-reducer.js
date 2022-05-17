import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        default:
            return state;
    }
}


const setAuthUserData = (id, email, login) => ({
    type: SET_USER_DATA,
    data: {id, email, login}
});
export const setIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

export const auth = () => {
    return (dispatch) => authAPI.me().then(res => {
        if (res.resultCode === 0) {
            let {id, email, login} = res.data;
            dispatch(setAuthUserData(id, email, login));
        }
    })
}

export default authReducer;