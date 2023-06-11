import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import {capitalize} from "../../../utils/helpers/helpers"
import {FC, useState} from "react"
import * as React from "react"
import {ProfileType} from "../../../redux/profile-reducer"
import ProfileDataForm from "./ProfileDataForm"
import {UseFormSetError} from "react-hook-form"
import type {ProfileFormValues, DisableEditModeType} from "../ProfileContainer"
import {Button, Card, message, Upload, UploadProps} from "antd"
import {UploadOutlined} from "@ant-design/icons"
import axios from "axios";

const { Meta } = Card

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: File) => void
    updateProfile: (profileData: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>, disableEditMode: DisableEditModeType) => void
    updateStatus: (newStatus: string) => void
}

const ProfileInfo: FC<PropsType> = ({profile, currentProfileAuthUser, savePhoto, status, updateProfile, updateStatus, gettingUserProfileData, uploadingData}) => {
    const [contactsHidden, toggleContactsVisible] = useState(true)
    const [editMode, toggleEditMode] = useState(false)

    const onClickToggleContactsVisible = () => {
        toggleContactsVisible(!contactsHidden)
    }

    const uploadUserPhoto = (info: any) => {
        if (info.file.status === 'done' && info.fileList.length === 1) {
            savePhoto(info.file);
        }
    }


    const props: UploadProps = {
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
    }

    // this check should be because TS warns about profile might be null
    if (!profile) {
        return <Preloader/>
    }

    // @ts-ignore
    // @ts-ignore
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
                                    <Upload>
                                        <Button icon={<UploadOutlined rev={undefined}/>}>Upload avatar</Button>
                                    </Upload>
                                </div>
                            }
                        </div>
                        <Card className={s.rightField}>
                            <div className={s.fullName}>
                                {profile.fullName + " " + profile.userId}
                            </div>
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

const ProfileData: FC<ProfileDataType> = ({profile,
                                              onClickToggleContactsVisible,
                                              contactsHidden,
                                              currentProfileAuthUser,
                                              toggleEditMode}) => {
    return <div>
        {
            currentProfileAuthUser && <div><button className={s.submit} onClick={toggleEditMode}>Edit</button></div>
        }
        {
            <div>
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

// <Upload
// name="photo"
// action="/api/upload"
// beforeUpload={beforeUpload}
// customRequest={(options) => {
//     const { onSuccess, file } = options;
//     const formData = new FormData();
//     formData.append('photo', file);
//     axios.post('/api/upload', formData).then(() => {
//         onSuccess(null, file);
//         if (fileList.length === 1) {
//             savePhoto(file);
//         }
//     });
// }}
// >
// <Button icon={<UploadOutlined />}>Upload Photo</Button>
// </Upload>
