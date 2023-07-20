import {NavLink} from "react-router-dom"
import * as React from "react"
import {Avatar, Layout, Menu} from "antd"
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors"
import {useSelector} from "react-redux"
import {SettingOutlined} from "@ant-design/icons"
import s from "./Header.module.css"

const { Header } = Layout

type PropsType = {
	logOut: () => void
}

export const AppHeader: React.FC<PropsType> = ({ logOut }) => {

	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectLogin)

	return (
		<Header
			className={s.appHeader}
		>
			{
				isAuth
					? <div
						className={s.appHeaderContent}
					>
							<Avatar
								className={s.headerAvatar}
							>
								{login}
							</Avatar>
							<Menu
								theme="dark"
								mode="horizontal"
								className={s.appHeaderMenu}
								overflowedIndicator={
									<SettingOutlined
										className={s.appHeaderMenuIcon}
										style={{ fontSize: '200%'}}
									/>
								}
							>
								<Menu.Item
									key="1"
									onClick={logOut}
								>
									<span>Log out</span>
								</Menu.Item>
								<Menu.Item
									key="2"
								>
									<NavLink to="/settings">Settings</NavLink>
								</Menu.Item>
							</Menu>
					</div>
					: <></>
			}
		</Header>
	)
}