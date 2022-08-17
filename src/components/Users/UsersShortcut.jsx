import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import React from "react";

export let UsersShortcut = ({user, followingInProgress, toggleUserFollow}) => {
    return <div className={s.userDiv}>
                <span className={s.leftField}>
                    <div className={s.avaDiv}>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             alt="ava"
                             className={s.ava}/>
                    </NavLink>
                    </div>
                    <div className={s.leftFieldBtn}>
                    {
                        !user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => toggleUserFollow(user.id, user.followed)}>Follow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => toggleUserFollow(user.id, user.followed)}>Unfollow</button>
                    }
                    </div>
                </span>
                <span className={s.userInfo}>
                    <div className={s.userInfoItems}>
                    <span className={s.userPersonalInfo}>
                        <div>{user.name + " " + user.id}</div>
                        <div className={s.status}>{user.status != null ? user.status : "No status."}</div>
                    </span>
                    <span className={s.location}>
                        <div>{"u.location.country"}</div>
                        <div className={s.city}>{"u.location.city"}</div>
                    </span>
                    </div>
                </span>
    </div>
}