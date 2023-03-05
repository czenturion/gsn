import * as React from "react"
import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import Post from "./Post/Post"
import {PostType} from "../../../redux/profile-reducer"
import {Button, createStyles, makeStyles, TextField, Theme} from "@material-ui/core"

type PropsType = {
    addPost: (post: string) => void
    postsElements?: PostType[]
}

type FormValues = {
    post: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: "flex"
        },
        input: {
            height: 45
        },
        submit: {
            height: 45,
            width: "40%",
            marginLeft: theme.spacing(1),
            backgroundColor: "#1e82f3"
        }
    })
)

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

    const classes = useStyles()

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                type="text"
                variant="outlined"
                autoComplete="off"
                InputProps={{
                    className: classes.input
                }}
                fullWidth
                placeholder="Enter a new post..."
                {...register("post",
                    {required: true})}/>
            <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
                type={"submit"}>SEND</Button>

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
