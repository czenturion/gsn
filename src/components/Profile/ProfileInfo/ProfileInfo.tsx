import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import {capitalize} from "../../../utils/helpers/helpers"
import {FC, useState} from "react"
import * as React from "react"
import {ProfileType} from "../../../redux/profile-reducer"

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: File) => void
    updateStatus: (newStatus: string) => void
}

const ProfileInfo: FC<PropsType> = ({profile, currentProfileAuthUser, savePhoto, status, updateStatus, gettingUserProfileData, uploadingData}) => {

    const [contactsHidden, toggleContactsVisible] = useState(true)

    const onClickToggleContactsVisible = () => {
        toggleContactsVisible(!contactsHidden)
    }

    if (!profile) {
        return <Preloader/>
    }

    const contacts = Object.keys(profile.contacts).map(item => {
            return <div key={item}>
                {
                    // @ts-ignore
                    capitalize(item) + " : " + profile.contacts[item]
                }
            </div>
        }
    )

    const uploadUserPhoto = (event: { target: HTMLInputElement }) => {
        const target = event.target
        if (target.files!.length > 0) {
            savePhoto(target.files![0])
        }
    }

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
                                {profile.fullName}
                            </div>
                            <ProfileStatus
                                status={status}
                                updateStatus={updateStatus}
                                currentProfileAuthUser={currentProfileAuthUser}/>
                            <div>
                                <h3>{profile.userId}</h3>
                            </div>
                            {
                                <div>
                                <span className={s.contactsList}
                                      onClick={onClickToggleContactsVisible}>Contacts {!contactsHidden ? "- - -" : "+++"}</span>
                                    {!contactsHidden ? <div className={s.contacts}>{contacts}</div> : <></>}
                                </div>
                            }
                            <div>
                                {
                                    profile.lookingForAJob
                                        ? <h2>Looking for a job</h2>
                                        : <h2>Not looking for a job</h2>
                                }
                            </div>
                            <div>
                                {
                                    profile.aboutMe
                                        ? <div> {profile.aboutMe} </div>
                                        : <div> {""} </div>
                                }
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfileInfo