import s from "./MyPosts.module.css";
import React from "react";
import {useForm} from "react-hook-form";


const AddPostForm = (props) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (values) => {
        props.addPost(values.post)
        reset()
    }

    return (
        <form
            className={s.message}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={s.text}>
                <input
                    type="text"
                    placeholder="Enter a new post..."
                    {...register("post")}/>
            </div>
            <div className={s.submit}>
                <input
                    type={"submit"}/>
            </div>
        </form>
    )
}

const MyPosts = (props) => {
    return (
        <div>
            <AddPostForm addPost={props.addPost}/>
            <div>
                {/* Посты */}
                {props.postsElements}
            </div>
        </div>
    )
}

export default MyPosts;
