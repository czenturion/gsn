import * as React from "react"
import {FC, useEffect} from "react"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import {compose} from "redux"
import {
    getUserProfile,
    getUserStatus,
    updateProfile,
    savePhoto,
    setCurrentProfileAuthUser,
    updateStatus
} from "../../redux/profile-reducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Profile from "./Profile"
import {AppStateType} from "../../redux/redux-store"
import {UseFormSetError} from "react-hook-form"
import type {ProfileContactsType} from "../../redux/profile-reducer"

export type ProfileFormValues = {
    profileForm?: string[]
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ProfileContactsType
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

export type DisableEditModeType = () => void

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
    setCurrentProfileAuthUser: (value: boolean) => void
    updateProfile: (profileData: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>, disableEditMode: DisableEditModeType) => void
    savePhoto: (file: File) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const ProfileContainer: FC<PropsType> = (props) => {
    let {userId} = useParams<{userId: string}>()

    useEffect(() => {
        props.setCurrentProfileAuthUser(false)

        if (!userId && props.auth.isAuth) {
            userId = String(props.auth.id)
            props.setCurrentProfileAuthUser(true)
        }
        // todo: should to find out how to type it
        props.getUserProfile(+userId!)
        props.getUserStatus(+userId!)
    }, [userId])

    return <Profile profile={props.profile}
                 status={props.status}
                 updateStatus={props.updateStatus}
                 currentProfileAuthUser={props.currentProfileAuthUser}
                 updateProfile={props.updateProfile}
                 savePhoto={props.savePhoto}
                 uploadingData={props.uploadingData}
                 gettingUserProfileData={props.gettingUserProfileData}/>
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentProfileAuthUser: state.profilePage.currentProfileAuthUser,
    uploadingData: state.profilePage.uploadingData,
    gettingUserProfileData: state.profilePage.gettingUserProfileData,
    auth: state.auth
})

export default compose<React.Component>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {
            getUserProfile,
            getUserStatus,
            updateProfile,
            updateStatus,
            setCurrentProfileAuthUser,
            savePhoto
        }),
    withAuthRedirect)(ProfileContainer)