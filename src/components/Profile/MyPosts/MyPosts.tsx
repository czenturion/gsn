import * as React from "react"
import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import Post from "./Post/Post"
import {PostType} from "../../../redux/profile-reducer"

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
                autoComplete="off"
                placeholder="Enter a new post..."
                {...register("post",
                    {required: true})}/>
            <button
                type={"submit"}>SEND</button>

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
                        ? props.postsElements.reverse().map(post => <Post message={post.message}
                                                                likesCount={post.likesCount}
                                                                key={post.id}/>)
                        : <></>
                }
            </div>
        </div>
    )
}

export default MyPosts
