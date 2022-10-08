import s from "./Header.module.css"
import {NavLink} from "react-router-dom"
import * as React from "react"

type PropsType = {
	login: string | null
	isAuth: boolean
	logOut: () => void
}

const Header: React.FC<PropsType> = (props) => {
	return (
		<header className={s.header}>
			<div className={s.logo}>
				<img
					src="https://icon-library.com/images/white-globe-icon/white-globe-icon-24.jpg"
					alt="logo"
					className={s.logo}
				/>
				<p>GSN</p>
			</div>
			<div className={s.authBlock}>
				{
					props.isAuth
						? <div>
							<NavLink className={s.authItem} to={"/login"}>{props.login}</NavLink>
							<span> | </span>
							<span className={s.authItem} onClick={props.logOut}>Log Out</span>
						</div>
						: <NavLink to={"/login"}>Login</NavLink>
				}
			</div>
		</header>
	)
}

export default Header
