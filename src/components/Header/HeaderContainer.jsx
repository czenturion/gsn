import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {auth} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {


    componentDidMount() {
        this.props.auth();
    };


    render() {
        return <Header {...this.props} />
    };
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {auth})(HeaderContainer);
