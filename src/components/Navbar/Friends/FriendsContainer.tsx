import Friends from "./Friends"
import {connect} from "react-redux"
import {AppStateType} from "../../../redux/redux-store"
import {FriendType} from "../../../redux/sidebar-reducer"

export type FriendsMapStateToPropsType = {
    friends: FriendType[]
}

const mapStateToProps = (state: AppStateType): FriendsMapStateToPropsType => {
    return {
        friends: state.friendsList
    }
}

export default connect<FriendsMapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, {})(Friends)
