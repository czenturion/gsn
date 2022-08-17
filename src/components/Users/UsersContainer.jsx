import {connect} from "react-redux";
import {
    setCurrentPage,
    getUsers,
    toggleUserFollow
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {Carousel} from "../common/Paginator/Carousel";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getSuperFilteredUsers,
    getTotalUsersCount
} from "../../redux/users-selectors";


class UsersComponent extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }


    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {

        // [totalPagesCount].slice(currentPage ± 5)
        let slicedPages = Carousel(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage);

        return <>
            {
                this.props.isFetching
                    ? <Preloader/>
                    : <Users slicedPages={slicedPages}
                             currentPage={this.props.currentPage}
                             onPageChanged={this.onPageChanged}
                             users={this.props.users}
                             toggleUserFollow={this.props.toggleUserFollow}
                             followingInProgress={this.props.followingInProgress}/>
            }
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getSuperFilteredUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};


export default compose(
    connect(mapStateToProps,
        {
            toggleUserFollow,
            setCurrentPage,
            getUsers
        }),
    withAuthRedirect)(UsersComponent);