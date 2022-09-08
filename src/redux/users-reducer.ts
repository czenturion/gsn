import {usersAPI} from "../api/api"
import {ProfilePhotosType} from "./profile-reducer"

const SET_USERS = "gsn/users/SET_USERS"
const SET_TOTAL_USERS_COUNT = "gsn/users/SET_TOTAL_USERS_COUNT"
const SET_CURRENT_PAGE = "gsn/users/SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "gsn/users/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "gsn/users/TOGGLE_IS_FOLLOWING_IN_PROGRESS"
const TOGGLE_FOLLOW = "gsn/users/TOGGLE_FOLLOW"

type UsersType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: ProfilePhotosType
    status: string | null
    followed: boolean
}

const initialState = {
    users: [] as UsersType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[] // array of user ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: !user.followed}
                    }
                    return user
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}

// Actions
type ToggleFollowType = {
    type: typeof TOGGLE_FOLLOW
    userId: number
}
const toggleFollow = (userId: number): ToggleFollowType => ({type:
    TOGGLE_FOLLOW,
    userId})
//
type SetUsersType = {
    type: typeof SET_USERS
    users: UsersType[]
}
export const setUsers = (users: UsersType[]): SetUsersType => ({type:
    SET_USERS,
    users})
//
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage})

type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})

type SetIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type SetIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const setIsFollowing = (isFetching: boolean, userId: number): SetIsFollowingType => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId
})


// Redux-thunk
export const getUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPage(page))

    const res = await usersAPI.getUsers(page, pageSize)

    dispatch(setUsers(res.items))
    dispatch(setUsersTotalCount(res.totalCount))
    dispatch(setIsFetching(false))
}

export const toggleUserFollow = (userId: number, followed: boolean) => async (dispatch: any) => {
    dispatch(setIsFollowing(true, userId))

    followed
        ? await usersAPI.unfollowUser(userId)
        : await usersAPI.followUser(userId)

    dispatch(toggleFollow(userId))
    dispatch(setIsFollowing(false, userId))
}

export default usersReducer