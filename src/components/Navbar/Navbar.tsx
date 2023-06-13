import { NavLink } from "react-router-dom"
import * as React from "react"
import { Layout, Menu } from "antd";

const { Sider } = Layout

type PropsType = {
    colorBgContainer: string
}

const Navbar: React.FC<PropsType> = ({ colorBgContainer }) => {
    return (
        <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
                mode="inline"
                defaultOpenKeys={['sub1']}
                style={{
                    height: '100%',
                    borderRight: 0
                }}
            >
                <Menu.SubMenu key="sub1" title="My Profile">
                    <Menu.Item key="1">
                        <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/dialogs">Messages</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/music">Music</NavLink>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub2" title="Developers">
                    <Menu.Item key="4">
                        <NavLink to="/users">Find users</NavLink>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="5">
                    <NavLink to="/news">News</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Navbar
