import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/astroIco.jpg";
import ProfileStatus from "./ProfileStatus";
import {capitalize} from "../../../utils/helpers/helpers";

const ProfileInfo = ({profile, ...props}) => {

    if (!profile) {
        return <Preloader/>
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
                        profile.photos.large
                            ? <img src={profile.photos.large} alt=""/>
                            : <img src={userPhoto} alt=""/>
                    }
                </div>
                <div className={s.rightField}>
                    <div className={s.fullName}>
                        {profile.fullName}
                    </div>
                    <ProfileStatus
                        status={props.status}
                        updateStatus={props.updateStatus}
                        currentProfileAuthUser={props.currentProfileAuthUser}/>
                    <div>
                        <h3>{profile.userId}</h3>
                    </div>
                    {
                        Object.keys(profile.contacts).map(item => {
                                return <div key={item}>
                                    {capitalize(item) + " : " + profile.contacts[item]}
                                </div>
                            }
                        )
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

export default ProfileInfo;