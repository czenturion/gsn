import * as React from "react"
import {FC, useEffect} from "react"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import {compose} from "redux"
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    setCurrentProfileAuthUser,
    updateStatus
} from "../../redux/profile-reducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Profile from "./Profile"
import {AppStateType} from "../../redux/redux-store"

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
    setCurrentProfileAuthUser: (value: boolean) => void
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
                 savePhoto={props.savePhoto}
                 uploadingData={props.uploadingData}/>
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentProfileAuthUser: state.profilePage.currentProfileAuthUser,
    uploadingData: state.profilePage.uploadingData,
    auth: state.auth
})

export default compose<React.Component>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {
            getUserProfile,
            getUserStatus,
            updateStatus,
            setCurrentProfileAuthUser,
            savePhoto
        }),
    withAuthRedirect)(ProfileContainer)