import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/astroIco.jpg";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {

    if (!props.pofile) {
        return <Preloader/>
    }

    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
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
                        props.pofile.photos.large
                            ? <img src={props.pofile.photos.large} alt=""/>
                            : <img src={userPhoto} alt=""/>
                    }

                </div>
                <div className={s.rightField}>

                    <div className={s.fullName}>
                        {props.pofile.fullName}
                    </div>

                    <ProfileStatus
                        status={props.status}
                        updateStatus={props.updateStatus}/>

                    <div>
                        <h3>{props.pofile.userId}</h3>
                    </div>

                    {Object.keys(props.pofile.contacts).map(item => {
                        return <div key={item}>
                            {capitalize(item) + " : " + props.pofile.contacts[item]}
                        </div>
                    })}

                    <div>
                        {props.pofile.lookingForAJob
                            ? <h2>Looking for a job</h2>
                            : <h2>Not looking for a job</h2>}
                    </div>
                    <div>
                        {props.pofile.aboutMe
                            ? <div> {props.pofile.aboutMe} </div>
                            : <div> {""} </div>}
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;