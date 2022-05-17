import s from "./Users.module.css";
import React from "react";
import userPhoto from "../../assets/images/userPhoto.png"
import {NavLink} from "react-router-dom";


let Users = (props) => {
    return <div>
        <div className={s.pages}>
            {props.slicedPages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : ""}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}
                             key={p}>{p}
                    </span>
            })}
        </div>

        {props.users.map(u =>
            <div className={s.userDiv} key={u.id}>
            <span className={s.leftField}>
                <div className={s.avaDiv}>
                    <NavLink to={"/profile/" + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             alt="ava"
                             className={s.ava}/>
                    </NavLink>
                </div>
                <div className={s.leftFieldBtn}>

                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => {
                                      props.unfollow(u.id)
                                  }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => {
                                      props.follow(u.id)
                                  }}>Follow</button>}
                </div>
            </span>
                <span className={s.userInfo}>
                <div className={s.userInfoItems}>
                    <span className={s.userPersonalInfo}>
                        <div>{u.name + " " + u.id}</div>
                        <div className={s.status}>{u.status != null ? u.status : "No status."}</div>
                    </span>
                    <span className={s.location}>
                        <div>{"u.location.country"}</div>
                        <div className={s.city}>{"u.location.city"}</div>
                    </span>
                </div>
            </span>
            </div>)}
    </div>
}

export default Users;