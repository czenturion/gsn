import s from "./../Navbar.module.css"
import * as React from "react"
import {FriendType} from "../../../redux/sidebar-reducer"

type PropsType = {
    friends: FriendType[]
}

const Friends: React.FC<PropsType> = ({friends}) => {
    return (
        <div className={s.friendsList}>
            {
                friends.map(f => <div className={s.friend} key={f.id}>
                                    <img src={f.ava} alt="ava"/>
                                    <p className={s.name}>{f.name}</p>
                                 </div>)
            }
        </div>
    )
}

export default Friends