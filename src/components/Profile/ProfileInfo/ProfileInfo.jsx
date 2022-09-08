import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import {capitalize} from "../../../utils/helpers/helpers"
import {useState} from "react"

const ProfileInfo = ({profile, currentProfileAuthUser, savePhoto, ...props}) => {
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
                    capitalize(item) + " : " + profile.contacts[item]
                }
            </div>
        }
    )

    const uploadUserPhoto = (e) => {
        if (e.target.files.length > 0) {
            savePhoto(e.target.files[0])
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
            <div className={s.avatar}>
                <div className={s.leftField}>
                    {
                        props.uploadingData
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
                        status={props.status}
                        updateStatus={props.updateStatus}
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
        </div>
    )
}

export default ProfileInfo