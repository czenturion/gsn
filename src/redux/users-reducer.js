import {usersAPI} from "../api/api";

const SET_USERS = "gsn/users/SET_USERS";
const SET_TOTAL_USERS_COUNT = "gsn/users/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "gsn/users/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "gsn/users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "gsn/users/TOGGLE_IS_FOLLOWING_IN_PROGRESS";
const TOGGLE_FOLLOW = "gsn/users/TOGGLE_FOLLOW";

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

        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: !user.followed}
                    }
                    return user
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    }
}

// Actions
const toggleFollow = (userID) => ({type: TOGGLE_FOLLOW, userID});
//
export const setUsers = (users) => ({type: SET_USERS, users});
//
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setIsFollowing = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});


// Redux-thunk
export const getUsers = (page, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page))

    const res = await usersAPI.getUsers(page, pageSize);

    dispatch(setUsers(res.items));
    dispatch(setUsersTotalCount(res.totalCount));
    dispatch(setIsFetching(false));
}

export const toggleUserFollow = (userId, followed) => async (dispatch) => {
    dispatch(setIsFollowing(true, userId));

    followed
        ? await usersAPI.unfollowUser(userId)
        : await usersAPI.followUser(userId)

    dispatch(toggleFollow(userId));
    dispatch(setIsFollowing(false, userId));

}

export default usersReducer;