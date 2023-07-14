import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPosts from "./MyPosts/MyPostsContainer"
import * as React from "react"
import {ProfileType} from "../../redux/profile-reducer"
import {FC} from "react"
import {UseFormSetError} from "react-hook-form"
import type {ProfileFormValues, DisableEditModeType} from "./ProfileContainer"

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: File) => void
    updateStatus: (newStatus: string) => void
    updateProfile: (
        profileData: ProfileFormValues,
        setError: UseFormSetError<ProfileFormValues>,
        disableEditMode: DisableEditModeType
    ) => void
}

const Profile: FC<PropsType> = ({
                                    profile,
                                    status, updateStatus,
                                    currentProfileAuthUser,
                                    updateProfile,
                                    savePhoto,
                                    gettingUserProfileData,
                                    uploadingData}) => {
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                currentProfileAuthUser={currentProfileAuthUser}
                savePhoto={savePhoto}
                uploadingData={uploadingData}
                gettingUserProfileData={gettingUserProfileData}
                updateProfile={updateProfile}/>
            <MyPosts/>
        </div>
    )
}

export default Profile
