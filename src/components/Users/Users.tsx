import s from "./Users.module.css"
import * as React from "react"
import {UsersShortcut} from "./UsersShortcut"
import {UserType} from "../../redux/users-reducer"

type PropsType = {
    users: UserType[]
    currentPage: number
    slicedPages: number[]
    followingInProgress: number[]
    onPageChanged: (pageNumber: number) => void
    toggleUserFollow: (userId: number, followed: boolean) => void
}

const Users: React.FC<PropsType> = ({
                                        slicedPages,
                                        currentPage,
                                        onPageChanged,
                                        users,
                                        followingInProgress,
                                        toggleUserFollow }) => {
    return <div>
        <div className={s.pages}>
            {
                slicedPages.map(p => {
                    return <span className={currentPage === p ? s.selectedPage : ""}
                                 onClick={() => onPageChanged(p)}
                                 key={p}>{p}</span>
                })
            }
        </div>
        {
            users.map(u => <UsersShortcut user={u} key={u.id}
                                          followingInProgress={followingInProgress}
                                          toggleUserFollow={toggleUserFollow}/>)
        }
    </div>
}

export default Users