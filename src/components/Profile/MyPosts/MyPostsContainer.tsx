import MyPosts from "./MyPosts"
import {addPost, PostType} from "../../../redux/profile-reducer"
import {connect} from "react-redux"
import {AppStateType} from "../../../redux/redux-store"

type MapStateToPropsType = {
    postsElements: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (post: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsElements: state.profilePage.posts
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    {addPost})(MyPosts)
