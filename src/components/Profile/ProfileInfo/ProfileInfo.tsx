import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import {capitalize} from "../../../utils/helpers/helpers"
import {FC, useState} from "react"
import * as React from "react"
import {ProfileContactsType, ProfileType} from "../../../redux/profile-reducer"
import ProfileDataForm from "./ProfileDataForm"
import {UseFormSetError} from "react-hook-form"

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: File) => void
    updateProfile: (profileData: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>) => void
    updateStatus: (newStatus: string) => void
}

const ProfileInfo: FC<PropsType> = ({profile, currentProfileAuthUser, savePhoto, status, updateProfile, updateStatus, gettingUserProfileData, uploadingData}) => {
    const [contactsHidden, toggleContactsVisible] = useState(true)
    const [editMode, toggleEditMode] = useState(false)

    const onClickToggleContactsVisible = () => {
        toggleContactsVisible(!contactsHidden)
    }

    const uploadUserPhoto = (event: { target: HTMLInputElement }) => {
        const target = event.target
        if (target.files!.length > 0) {
            savePhoto(target.files![0])
        }
    }

    // this check should be because TS warns about profile might be null
    if (!profile) {
        return <Preloader/>
    }

    const contactsParsedList = Object.keys(profile.contacts).map(key => {
        // @ts-ignore
        return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>
        }
    )

    return (
        <div>
            <div className={s.backgroundPic}>
                <img
                    src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg"
                    alt=""
                />
            </div>
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
                                    <label htmlFor="file-upload" className={s.customFileUpload}>Upload Avatar</label>
                                    <input type="file"
                                           onChange={uploadUserPhoto}
                                           id="file-upload"
                                           accept=".png,.jpg,.jpeg"/></div>
                            }
                        </div>
                        <div className={s.rightField}>
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
                                                   onClickToggleContactsVisible={onClickToggleContactsVisible}
                                                   contactsHidden={contactsHidden}
                                                   contactsParsedList={contactsParsedList}
                                                   updateProfile={updateProfile}
                                                   disableEditMod={() => {
                                                       toggleEditMode(false)
                                                       onClickToggleContactsVisible()
                                                   }}/>
                                : <ProfileData profile={profile}
                                         onClickToggleContactsVisible={onClickToggleContactsVisible}
                                         contactsHidden={contactsHidden}
                                         contactsParsedList={contactsParsedList}
                                         currentProfileAuthUser={currentProfileAuthUser}
                                         toggleEditMode={() => {
                                             toggleEditMode(true)
                                             onClickToggleContactsVisible()
                                         }}/>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export type ProfileDataType = {
    profile: ProfileType
    // todo: describe type contactsParsedList
    contactsParsedList: any
    contactsHidden: boolean
    currentProfileAuthUser?: boolean
    onClickToggleContactsVisible: () => void
    toggleEditMode?: () => void
    disableEditMod?: () => void
    updateProfile?: (formValues: ProfileFormValues, setError: UseFormSetError<ProfileFormValues>) => void
}

export type ProfileFormValues = {
    serverResponse: string[]
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ProfileContactsType
}

const ProfileData: FC<ProfileDataType> = ({profile,
                                              onClickToggleContactsVisible,
                                              contactsHidden,
                                              contactsParsedList,
                                              currentProfileAuthUser,
                                              toggleEditMode}) => {
    return <div>
        {
            currentProfileAuthUser && <div><button onClick={toggleEditMode}>Edit</button></div>
        }
        {
            <div>
                <span className={s.contactsList} onClick={onClickToggleContactsVisible}>Contacts {!contactsHidden ? "- - -" : "+++"}</span>
                {
                    !contactsHidden
                        ? <div className={s.contacts}>{contactsParsedList}</div>
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