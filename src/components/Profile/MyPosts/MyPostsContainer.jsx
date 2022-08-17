import MyPosts from "./MyPosts";
import {addPost} from "../../../redux/profile-reducer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        postsElements: state.profilePage.posts
    }
};

export default connect(mapStateToProps, {addPost})(MyPosts);
