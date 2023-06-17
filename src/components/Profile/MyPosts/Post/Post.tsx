import s from "./Post.module.css"
import * as React from "react"
import {Avatar, Button, Card, Col, Row, Typography} from "antd"
import {LikeOutlined} from "@ant-design/icons"

type PropsType = {
    message: string
    likesCount: number
}

const {Text} = Typography

const Post: React.FC<PropsType> = (props) => {
    return (
        <Card style={{
            marginTop: "20px"
        }}>
            <Row>
                <Col span={2}>
                    <Avatar
                        src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
                        size={45}/>
                </Col>
                <Col span={18}>
                    <Text style={{
                        marginLeft: "10px"
                    }}>
                        {props.message}
                    </Text>
                </Col>
                <Col span={2}></Col>
                <Col span={2}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <div>
                            {props.likesCount}
                            <LikeOutlined size={20}/>
                        </div>
                        <Button style={{
                            marginLeft: "10px"
                        }}>
                            Like
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default Post
