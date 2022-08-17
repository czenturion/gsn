import s from "./Users.module.css";
import React from "react";
import {UsersShortcut} from "./UsersShortcut";


let Users = ({ slicedPages, currentPage, onPageChanged, users, followingInProgress, toggleUserFollow }) => {
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

export default Users;