import {connect} from "react-redux"
import {
    setCurrentPage,
    getUsers,
    toggleUserFollow,
    UserType
} from "../../redux/users-reducer"
import * as React from "react"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getSuperFilteredUsers,
    getTotalUsersCount
} from "../../redux/users-selectors"
import {AppStateType} from "../../redux/redux-store"

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: UserType[]
    followingInProgress: number[]
}

type MapDispatchToPropsType = {
    getUsers: (page: number, pageSize: number) => void
    toggleUserFollow: (userId: number, followed: boolean) => void
    setCurrentPage: (currentPage: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }


    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        let pagesData = {
            totalUsersCount: this.props.totalUsersCount,
            pageSize: this.props.pageSize,
            currentPage: this.props.currentPage
        }

        return <>
            {
                this.props.isFetching
                    ? <Preloader size="large" style={{padding: "200px 0"}}/>
                    : <Users
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        toggleUserFollow={this.props.toggleUserFollow}
                        followingInProgress={this.props.followingInProgress}
                        pagesData={pagesData}
                    />
            }
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getSuperFilteredUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.Component>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps,
        {
            toggleUserFollow,
            setCurrentPage,
            getUsers
        }),
    withAuthRedirect)(UsersComponent)