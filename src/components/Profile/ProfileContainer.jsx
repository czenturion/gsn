import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";


let ProfileContainer = (props) => {

    let {userId} = useParams();

    useEffect(() => {
        if (userId) {
            props.getUserProfile(userId);
        } else if (!userId && props.auth.isAuth) {
            props.getUserProfile(props.auth.id);
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <Profile {...props} />
};


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});


export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withAuthRedirect)(ProfileContainer);