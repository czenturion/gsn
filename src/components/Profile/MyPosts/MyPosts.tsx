import s from "./MyPosts.module.css"
import * as React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import Post from "./Post/Post"
import {FC} from "react"
import {PostType} from "../../../redux/profile-reducer";

type PropsType = {
    addPost: (post: string) => void
    postsElements?: PostType[]
}

type FormValues = {
    post: string
}

const AddPostForm: FC<PropsType> = ({addPost}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        addPost(values.post)
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
                    {...register("post",
                        {required: true})}/>
            </div>
            <div className={s.submit}>
                <input
                    type={"submit"}/>
            </div>
        </form>
    )
}

const MyPosts: FC<PropsType> = (props) => {
    return (
        <div>
            <AddPostForm addPost={props.addPost}/>
            <div>
                {
                    props.postsElements
                        ? props.postsElements.map(post => <Post message={post.message}
                                                                likesCount={post.likesCount}
                                                                key={post.id}/>)
                        : <></>
                }
            </div>
        </div>
    )
}

export default MyPosts
