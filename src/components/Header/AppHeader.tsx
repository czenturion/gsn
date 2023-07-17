import { NavLink } from "react-router-dom"
import * as React from "react"
import { Avatar, Col, Menu, Row, Layout } from "antd"
import { selectIsAuth, selectLogin } from "../../redux/auth-selectors"
import { useSelector } from "react-redux"
import {SettingOutlined} from "@ant-design/icons";

const { Header } = Layout

type PropsType = {
	logOut: () => void
}

export const AppHeader: React.FC<PropsType> = ({ logOut }) => {

	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectLogin)

	return (
		<Header style={{display: 'flex', alignItems: 'center'}}>
			{
				isAuth
					? <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto"}}>
							<Avatar style={{backgroundColor: 'gray'}}>
								{login}
							</Avatar>
							<Menu theme="dark" mode="horizontal" style={{width: "40px"}} expandIcon={<SettingOutlined />}>
								<Menu.Item key="1" onClick={logOut}>
									<span>Log out</span>
								</Menu.Item>
								<Menu.Item key="2">
									<NavLink to="/settings">Settings</NavLink>
								</Menu.Item>
							</Menu>
					</div>
					: <></>
			}
		</Header>
	)
}