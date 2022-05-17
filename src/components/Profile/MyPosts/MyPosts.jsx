import s from "./MyPosts.module.css";
import React from "react";


const MyPosts = (props) => {

    // Обработчик изменений textarea
    let newPostText = React.createRef();
    let onPostChange = () => {
        let text = newPostText.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div>
            <div className={s.message}>
                <textarea ref={newPostText}
                          placeholder="Enter a new post..."
                          onChange={onPostChange}
                          value={props.newPostText}/>
                <button onClick={props.addPost}>Add post</button>
            </div>
            <div>
                {/* Посты */}
                {props.postsElements}
            </div>
        </div>
    );
};

export default MyPosts;
