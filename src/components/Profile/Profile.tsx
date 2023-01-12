import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPosts from "./MyPosts/MyPostsContainer"
import * as React from "react"
import {ProfileType} from "../../redux/profile-reducer"
import {FC} from "react"

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: File) => void
    updateStatus: (newStatus: string) => void
}

const Profile: FC<PropsType> = ({profile, status, updateStatus, currentProfileAuthUser, savePhoto, gettingUserProfileData, uploadingData}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                currentProfileAuthUser={currentProfileAuthUser}
                savePhoto={savePhoto}
                uploadingData={uploadingData}
                gettingUserProfileData={gettingUserProfileData}/>
            <MyPosts/>
        </div>
    )
}

export default Profile
