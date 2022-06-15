import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile, getUserStatus, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";


let ProfileContainer = (props) => {

    let {userId} = useParams();

    if (!userId && props.auth.isAuth) {
        userId = props.auth.id;
    }

    useEffect(() => {
        props.getUserProfile(userId);
        props.getUserStatus(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <Profile {...props} />
};


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});


export default compose(
    connect(mapStateToProps,
        {
            getUserProfile,
            getUserStatus,
            updateStatus
        }),
    withAuthRedirect)(ProfileContainer);