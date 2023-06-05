import s from "./Header.module.css"
import {NavLink} from "react-router-dom"
import * as React from "react"
import {Menu, Typography} from "antd"
const { Text, Link } = Typography

type PropsType = {
	login: string | null
	isAuth: boolean
	logOut: () => void
}

const Header: React.FC<PropsType> = ({isAuth, login, logOut}) => {
	return (
		<div>
			{
				isAuth
					? <div>
						<Text type="secondary" style={{color: 'white'}}>
							{login}
						</Text>
						<Menu theme="dark" mode="horizontal">
							<Menu.Item key="head1">
								<div>
									<span onClick={() => logOut()}>Log Out</span>
								</div>
							</Menu.Item>
						</Menu>
					</div>
					: ""
			}
		</div>
	)
}

export default Header
