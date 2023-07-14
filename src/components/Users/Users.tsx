import s from "./Users.module.css"
import * as React from "react"
import {UsersShortcut} from "./UsersShortcut"
import {UserType} from "../../redux/users-reducer"
import {Pagination} from "antd"

type PropsType = {
    users: UserType[]
    followingInProgress: number[]
    onPageChanged: (pageNumber: number) => void
    toggleUserFollow: (userId: number, followed: boolean) => void
    pagesData: {
        totalUsersCount: number
        pageSize: number
        currentPage: number
    }
}

const Users: React.FC<PropsType> = ({
                                        onPageChanged,
                                        users,
                                        followingInProgress,
                                        toggleUserFollow,
                                        pagesData
                                    }) => {

    const onChange = (pageNumber: number) => {
        onPageChanged(pageNumber)
    }

    return <div>
        <div
            style={{
                marginBottom: "16px"
            }}
        >
            <Pagination
                defaultCurrent={pagesData.currentPage}
                total={pagesData.totalUsersCount}
                onChange={onChange}
                showSizeChanger={false}
            />
        </div>
        {
            users.map(u => <UsersShortcut user={u} key={u.id}
                                          followingInProgress={followingInProgress}
                                          toggleUserFollow={toggleUserFollow}/>)
        }
    </div>
}

export default Users