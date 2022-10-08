import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom"
import FriendsContainer from "./Friends/FriendsContainer"
import * as React from "react"

type PropsType = {

}

const Navbar: React.FC<PropsType> = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" style={({isActive}) => ({
                    color: isActive ? 'lime' : 'white'
                })}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" style={({isActive}) => ({
                    color: isActive ? 'lime' : 'white'
                })}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" style={({isActive}) => ({
                    color: isActive ? 'lime' : 'white'
                })}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" style={({isActive}) => ({
                    color: isActive ? 'lime' : 'white'
                })}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" style={({isActive}) => ({
                    color: isActive ? 'lime' : 'white'
                })}>Find users</NavLink>
            </div>
            <div className={`${s.item} ${s.settings}`}>
                <NavLink to="/settings" style={({isActive}) => ({
                    color: isActive ? 'yellow' : 'white'
                })}>Settings</NavLink>
            </div>
            <div className={`${s.item} ${s.friends}`}>
                <NavLink to="/dialogs">
                    <h1>Friends</h1>
                    <FriendsContainer/>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
