import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import { capitalize } from "../../../utils/helpers/helpers"
import * as React from "react"
import { FC, useState } from "react"
import { ProfileType } from "../../../redux/profile-reducer"
import ProfileDataForm from "./ProfileDataForm"
import { UseFormSetError } from "react-hook-form"
import {Button, Card, message, Upload} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { DisableEditModeType, ProfileFormValues } from "../ProfileContainer"


type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: any) => void
    updateProfile: (profileData: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>, disableEditMode: DisableEditModeType) => void
    updateStatus: (newStatus: string) => void
}

const ProfileInfo: FC<PropsType> = ({
                                        profile,
                                        currentProfileAuthUser,
                                        savePhoto,
                                        status,
                                        updateProfile,
                                        updateStatus,
                                        gettingUserProfileData,
                                        uploadingData }) => {

    const [contactsHidden, toggleContactsVisible] = useState(true)
    const [editMode, toggleEditMode] = useState(false)
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

    const onClickToggleContactsVisible = () => {
        toggleContactsVisible(!contactsHidden)
    }

    const uploadUserPhoto = (info: any) => {
        savePhoto(info.file)
    }

    const beforeUpload = (file: any) => {
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`Only ${allowedTypes.join(', ')} files are allowed!`);
        }
        return isAllowedType;
    }

    // this check should be because TS warns about profile might be null
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            {
                gettingUserProfileData
                    ? <Preloader/>
                    : <div className={s.avatar}>
                        <div className={s.leftField}>
                            {
                                uploadingData
                                    ? <Preloader/>
                                    : profile.photos.large
                                        ? <img src={profile.photos.large} alt=""/>
                                        : <img src={userPhoto} alt=""/>
                            }
                            {
                                currentProfileAuthUser && <div className={s.photoUpdateButtonField}>

                                    <Upload
                                        maxCount={1}
                                        beforeUpload={beforeUpload}
                                        customRequest={uploadUserPhoto}
                                        showUploadList={false}
                                    >
                                        <Button icon={<UploadOutlined rev={undefined}/>}>
                                            Upload avatar
                                        </Button>
                                    </Upload>
                                </div>
                            }
                        </div>
                        <Card className={s.rightField}>
                            <div className={s.fullName}>
                                {profile.fullName + " " + profile.userId}
                            </div>
                            <br/>
                            <ProfileStatus
                                status={status}
                                updateStatus={updateStatus}
                                currentProfileAuthUser={currentProfileAuthUser}/>

                            {
                                editMode
                                ? <ProfileDataForm profile={profile}
                                                   updateProfile={updateProfile}
                                                   disableEditMode={() => {
                                                       toggleEditMode(false)
                                                   }}/>
                                : <ProfileData profile={profile}
                                         onClickToggleContactsVisible={onClickToggleContactsVisible}
                                         contactsHidden={contactsHidden}
                                         currentProfileAuthUser={currentProfileAuthUser}
                                         toggleEditMode={() => {
                                             toggleEditMode(true)
                                             onClickToggleContactsVisible()
                                         }}/>
                            }
                        </Card>
                    </div>
            }
        </div>
    )
}

export type ProfileDataType = {
    profile: ProfileType
    contactsHidden?: boolean
    currentProfileAuthUser?: boolean
    onClickToggleContactsVisible?: () => void
    toggleEditMode?: () => void
    disableEditMode?: DisableEditModeType
    updateProfile?: (formValues: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>, disableEditMode: DisableEditModeType) => void
}

const ProfileData: FC<ProfileDataType> = ({ profile,
                                              onClickToggleContactsVisible,
                                              contactsHidden,
                                              currentProfileAuthUser,
                                              toggleEditMode }) => {
    return <div>
        {
            currentProfileAuthUser && <div>
                <br/>
                    <Button style={{width: "100px"}} onClick={toggleEditMode}>Edit</Button>
            </div>
        }
        {
            <div>
                <br/>
                <span className={s.contactsList} onClick={onClickToggleContactsVisible}>Contacts {!contactsHidden ? "- - -" : "+++"}</span>
                {
                    !contactsHidden
                        ? <div className={s.contacts}>{Object.keys(profile.contacts).map(key => {
                            // @ts-ignore
                            return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>})}</div>
                        : <></>
                }
            </div>
        }
        <div>
            {
                profile.lookingForAJob
                    ? <h2>Looking for a job</h2>
                    : <h2>Not looking for a job</h2>
            }
        </div>
        <div><b>About Me:</b> {profile.aboutMe}</div>
        <div><b>About skills</b>: {profile.lookingForAJobDescription}</div>
    </div>
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
  return <div className={s.contact}><b>{capitalize(contactTitle)}</b>: {contactValue}</div>
}

export default ProfileInfo

