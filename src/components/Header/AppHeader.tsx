import { NavLink } from "react-router-dom"
import * as React from "react"
import { Avatar, Col, Menu, Row, Layout } from "antd"

const { Header } = Layout

type PropsType = {
	login: string | null
	isAuth: boolean
	logOut: () => void
}

export const AppHeader: React.FC<PropsType> = ({ isAuth, login, logOut }) => {
	return (
		<Header style={{display: 'flex', alignItems: 'center'}}>
			<div className="logo"/>
			{
				isAuth
					? <Row style={{width: "100%"}}>
						<Col span={22}>
						</Col>
						<Col span={2}
							 style={{
								 display: "flex",
								 alignItems: "center",
								 justifyContent: "space-between"
							 }}
						>
							<Avatar style={{ backgroundColor: 'gray'}}>
								{ login }
							</Avatar>
							<Menu theme="dark" mode="horizontal" style={{width: "40px"}}>
								<Menu.Item key="1" onClick={logOut}>
									<span>Log out</span>
								</Menu.Item>
								<Menu.Item key="2">
									<NavLink to="/settings">Settings</NavLink>
								</Menu.Item>
							</Menu>
						</Col>
					</Row>
					: <></>
			}
		</Header>
	)
}