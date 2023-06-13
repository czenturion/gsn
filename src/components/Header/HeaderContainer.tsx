import * as React from "react"
import { AppHeader } from "./AppHeader"
import { connect } from "react-redux"
import { logOut } from "../../redux/auth-reducer"
import { AppStateType } from "../../redux/redux-store"

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <AppHeader { ...this.props } />
    }
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
const mapStateToProps = ( state: AppStateType ): MapStateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})

type MapDispatchToPropsType = {
    logOut: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {logOut})(HeaderContainer)
