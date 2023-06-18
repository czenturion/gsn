import * as React from "react"
import {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {Button, Col, Form, Row} from "antd"
import Post from "./Post/Post"
import {PostType} from "../../../redux/profile-reducer"
import TextArea from "antd/es/input/TextArea"

type PropsType = {
    addPost: (post: string) => void
    postsElements?: PostType[]
}

type FormValues = {
    post: string
}

const AddPostForm: FC<PropsType> = ({addPost}) => {
    const {register, handleSubmit, setValue} = useForm<FormValues>()
    const [form] = Form.useForm()

    useEffect(() => {
        register("post", {required: true})
    })

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        addPost(values.post)
        form.resetFields()
    }

    const getChangeHandlerWithEvent = (name: any) => (event: any) => {
        setValue(name, event.target.value)
    }

    return (
        <Form
            onFinish={handleSubmit(onSubmit)}
            form={form}
        >
            <Row>
                <Col span={18}>
                    <Form.Item
                        name="post"
                        rules={[{required: true, message: "Please enter a new post"}]}
                        initialValue={""}
                    >
                        <TextArea
                            placeholder="Enter a new post..."
                            onChange={getChangeHandlerWithEvent("post")}
                        />
                    </Form.Item>
                </Col>
                <Col span={2} style={{marginLeft: "8px"}}>
                    <Button type="primary" htmlType="submit">
                        SEND
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

const MyPosts: FC<PropsType> = (props) => {
    return (
        <div style={{marginTop: "40px"}}>
            <AddPostForm addPost={props.addPost}/>
            <div>
                {props.postsElements
                    ? props.postsElements.map((post) => (
                        <Post
                            message={post.message}
                            likesCount={post.likesCount}
                            key={post.id}
                        />
                    ))
                    : null}
            </div>
        </div>
    )
}

export default MyPosts
