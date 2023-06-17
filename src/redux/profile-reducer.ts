import {ResultCodesEnum} from "../api/api"
import {DisableEditModeType, ProfileFormValues} from "../components/Profile/ProfileContainer"
import {AppStateType} from "./redux-store"
import {ThunkAction} from "redux-thunk"
import {UseFormSetError} from "react-hook-form"
import {profileAPI} from "../api/profileAPI"

const ADD_POST = "gsn/profile/ADD-POST"
const SET_USER_PROFILE = "gsn/profile/SET_USER_PROFILE"
const SET_USER_STATUS = "gsn/profile/SET_USER_STATUS"
const CURRENT_PROFILE_AUTH_USER = "gsn/profile/CURRENT_PROFILE_AUTH_USER"
const DELETE_POST = "gsn/profile/DELETE_POST"
const SAVE_PHOTO_SUCCESS = "gsn/profile/SAVE_PHOTO_SUCCESS"
const GETTING_PROFILE_DATA = "gsn/profile/GETTING_PROFILE_DATA"
const SET_UPLOADING_DATA = "gsn/profile/SET_UPLOADING_DATA"

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileContactsType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export type ProfilePhotosType = {
    large: string | null
    small: string | null
}

export type ProfileType = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
}

const initialState = {
    posts: [
        {id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus.", likesCount: 20},
        {id: 2, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus.", likesCount: 15},
        {id: 3, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus.", likesCount: 50},
        {id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui quod reiciendis sequi! A, ad adipisci eaque earum illo libero magnam nam nemo non optio perspiciatis sint unde voluptatem voluptatibus.", likesCount: 33}
    ] as PostType[],
    profile: null as ProfileType | null,
    status: "",
    currentProfileAuthUser: false,
    gettingUserProfileData: false,
    uploadingData: false
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    message: action.post,
                    likesCount: 0
                }]
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

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

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }

        case GETTING_PROFILE_DATA:
            return {
                ...state,
                gettingUserProfileData: action.value
            }

        case SET_UPLOADING_DATA:
            return {
                ...state,
                uploadingData: action.value
            }

        default:
            return state
    }
}


// Actions
// Отправка и обновление поста
type ActionTypes = AddPostActionCreatorType | DeletePostType | SetUserProfileType | SetUserStatusType |
    SetCurrentProfileAuthUser | SavePhotoSuccessType | GettingUserProfileDataType | SetUploadingDataType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    post: string
}
export const addPostActionCreator = (post: string): AddPostActionCreatorType => ({
    type: ADD_POST,
    post
})

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({
    type: DELETE_POST,
    postId
})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    profile
})

type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({
    type: SET_USER_STATUS,
    status
})

export const updateUserStatus = (status: string): SetUserStatusType => ({
    type: SET_USER_STATUS,
    status
})

type SetCurrentProfileAuthUser = {
    type: typeof CURRENT_PROFILE_AUTH_USER
    currentProfileAuthUser: boolean
}
export const setCurrentProfileAuthUser = (value: boolean): SetCurrentProfileAuthUser => ({
    type: CURRENT_PROFILE_AUTH_USER,
    currentProfileAuthUser: value
})

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: ProfilePhotosType
}
export const savePhotoSuccess = (photos: ProfilePhotosType): SavePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

type GettingUserProfileDataType = {
    type: typeof GETTING_PROFILE_DATA,
    value: boolean
}
const gettingUserProfileData = (value: boolean): GettingUserProfileDataType => ({
    type: GETTING_PROFILE_DATA,
    value
})

type SetUploadingDataType = {
    type: typeof SET_UPLOADING_DATA
    value: boolean
}
export const setUploadingData = (value: boolean): SetUploadingDataType => ({
    type: SET_UPLOADING_DATA,
    value
})


// Redux-thunk
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

const {Success} = ResultCodesEnum

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    try {
        dispatch(gettingUserProfileData(true))

        const res = await profileAPI.getUserProfile(userId)

        dispatch(setUserProfile(res))
        dispatch(gettingUserProfileData(false))
    } catch (error) {
        alert(error)
    }
}

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    const res = await profileAPI.getUserStatus(userId)

    dispatch(setUserStatus(res))
}

export const updateProfile = (profileData: ProfileFormValues,
                              setError: UseFormSetError<ProfileFormValues>,
                              disableEditMode: DisableEditModeType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const {resultCode, messages} = await profileAPI.updateUserProfile(profileData)

    if (resultCode === Success) {
        await dispatch(getUserProfile(+userId!))
        disableEditMode()
    } else {
        // check up this change
        setError("profileForm", {type: "server", message: messages[0]})
    }
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
    const res = await profileAPI.updateUserStatus(status)

    if (res.resultCode === Success) {
        dispatch(updateUserStatus(status))
    }
}

export const addPost = (post: string): ThunkType => async dispatch => {
    await dispatch(addPostActionCreator(post))
}

export const savePhoto = (file: File): ThunkType => async dispatch => {
    dispatch(setUploadingData(true))
    const res = await profileAPI.saveUserPhoto(file)
    if (res.resultCode === Success) {
        dispatch(savePhotoSuccess(res.data.photos))
    }
    dispatch(setUploadingData(false))
}

export default profileReducer