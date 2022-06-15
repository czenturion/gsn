import MyPosts from "./MyPosts";
import Post from "./Post/Post";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        postsElements: state.profilePage.posts.map(post => <Post message={post.message}
                                                                 likesCount={post.likesCount}
                                                                 key={post.id}/>)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => {
            dispatch(addPostActionCreator(post))
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
