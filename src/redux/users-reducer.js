import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true};
                    }
                    return u;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false};
                    }
                    return u;
                })
            };

        case SET_USERS:
            return {...state, users: [...action.users]}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

// Actions
// Отправка и обновление поста
export const followSucces = (userID) => ({type: FOLLOW, userID});
export const unfollowSucces = (userID) => ({type: UNFOLLOW, userID});
// Запрос юзеров
export const setUsers = (users) => ({type: SET_USERS, users});
//
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setIsFollowing = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});


// Redux-thunk

export const getUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(res => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(res.items));
            dispatch(setUsersTotalCount(res.totalCount));
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        usersAPI.followUser(userId).then(res => {
            if (res.resultCode === 0) {
                dispatch(followSucces(userId));
            }
            dispatch(setIsFollowing(false, userId));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        usersAPI.unfollowUser(userId).then(res => {
            if (res.resultCode === 0) {
                dispatch(unfollowSucces(userId));
            }
            dispatch(setIsFollowing(false, userId));
        });
    }
}

export default usersReducer;