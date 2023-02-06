import axios from "axios"
import {FormValues} from "../components/Login/Login"
import {ProfileFormValues} from "../components/Profile/ProfileContainer"
import {ProfileContactsType, ProfilePhotosType} from "../redux/profile-reducer"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "1866b716-bc7d-42d6-af46-4e7775bb2540"
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

type GetUserProfileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: ProfilePhotosType
    aboutMe: string
    contacts: ProfileContactsType
    resultCode: ResultCodesEnum
}

type DefaultResponseResultObject = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {
        userId: number
    }
}

export const profileAPI = {
    getUserProfile(id: number) {
        return instance.get<GetUserProfileType>(`profile/${id}`)
            .then(response => response.data)
    },
    getUserStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`)
            .then(response => response.data)
    },
    updateUserProfile(profileData: ProfileFormValues) {
        return instance.put<DefaultResponseResultObject>('profile', profileData)
            .then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<DefaultResponseResultObject>('profile/status', {status})
            .then(response => response.data)
    },
    saveUserPhoto(file: any) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(response => response.data)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: string[]
}

type LoginResponseType = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {
        userId: number
    }
}

type LogoutResponseType = {
    resultCode: ResultCodesEnum
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
            .then(response => response.data)
    },
    login(formData: FormValues) {
        return instance.post<LoginResponseType>('auth/login', formData)
            .then(response => response.data)
    },
    logout() {
        return instance.post<LogoutResponseType>('auth/logout')
            .then(response => response.data)
    }
}

type GetCaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
}