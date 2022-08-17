import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    getUserProfile,
    getUserStatus,
    setCurrentProfileAuthUser,
    updateStatus
} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";


let ProfileContainer = (props) => {

    let {userId} = useParams();

    useEffect(() => {

        props.setCurrentProfileAuthUser(false)

        if (!userId && props.auth.isAuth) {
            userId = props.auth.id;
            props.setCurrentProfileAuthUser(true)
        }
        props.getUserProfile(userId);
        props.getUserStatus(userId);
    }, [userId]);


    return <Profile {...props} />
};


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentProfileAuthUser: state.profilePage.currentProfileAuthUser
});


export default compose(
    connect(mapStateToProps,
        {
            getUserProfile,
            getUserStatus,
            updateStatus,
            setCurrentProfileAuthUser
        }),
    withAuthRedirect)(ProfileContainer);