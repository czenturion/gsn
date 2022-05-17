import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = (props) => {

    return (
        <div className={s.profile}>
            <ProfileInfo pofile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;
