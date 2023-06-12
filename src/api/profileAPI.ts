import {ProfileContactsType, ProfilePhotosType} from "../redux/profile-reducer"
import {ProfileFormValues} from "../components/Profile/ProfileContainer"
import {instance, ResultCodesEnum, DefaultResponseResultObject} from "./api"

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
type SaveUserPhotoType = {
    data: {
        photos: ProfilePhotosType
    }
    resultCode: ResultCodesEnum
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
    saveUserPhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put<SaveUserPhotoType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    }
}