import s from "./Users.module.css"
import {NavLink} from "react-router-dom"
import userPhoto from "../../assets/images/userPhoto.png"
import * as React from "react"
import {UserType} from "../../redux/users-reducer"
import {Button, Card, Typography} from "antd"

const {Text, Title} = Typography

type PropsType = {
    user: UserType
    followingInProgress: number[]
    toggleUserFollow: (userId: number, followed: boolean) => void
}

export const UsersShortcut: React.FC<PropsType> = ({user, followingInProgress, toggleUserFollow}) => {
    return <div className={s.userDiv}>
        <div className={s.leftField}>
            <div className={s.avaDiv}>
                <NavLink to={"/profile/" + user.id}>
                    <img
                        src={user.photos.small != null ? user.photos.small : userPhoto}
                        alt="ava"
                        className={s.ava}
                    />
                </NavLink>
            </div>
            <div
                className={s.leftFieldBtn}
            >
                {
                    !user.followed
                        ? <Button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => toggleUserFollow(user.id, user.followed)}
                        >
                            Follow
                        </Button>
                        : <Button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => toggleUserFollow(user.id, user.followed)}
                        >
                            Unfollow
                        </Button>
                }
            </div>
        </div>
        <Card className={s.userInfo}>
            <div
                className={s.userInfoName}
            >
                <Title level={5}>
                    {user.name}
                </Title>
                <Title level={5}>
                    {user.id}
                </Title>
            </div>
            <Text className={s.status}>
                {user.status != null ? user.status : "No status."}
            </Text>
        </Card>
    </div>
}