import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                currentProfileAuthUser={props.currentProfileAuthUser}/>
            <MyPosts/>
        </div>
    );
};

export default Profile;
