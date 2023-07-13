import {NavLink} from "react-router-dom"
import * as React from "react"
import {Layout, Menu} from "antd";

const {Item, SubMenu} = Menu
const {Sider} = Layout

type PropsType = {
    colorBgContainer: string
}

const Navbar: React.FC<PropsType> = ({colorBgContainer}) => {
    return (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
                height: "92vh"
            }}
        >
            <Menu
                mode="inline"
                defaultOpenKeys={['sub1']}
            >
                <SubMenu
                    key="sub1"
                    title="My Profile"
                >
                    <Item key="1">
                        <NavLink to="/profile">Profile</NavLink>
                    </Item>
                    <Item key="2">
                        <NavLink to="/dialogs">Messages</NavLink>
                    </Item>
                    <Item key="3">
                        <NavLink to="/music">Music</NavLink>
                    </Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title="Developers"
                >
                    <Item key="4">
                        <NavLink to="/users">Find users</NavLink>
                    </Item>
                </SubMenu>
                <Item
                    key="5"
                >
                    <NavLink to="/news">News</NavLink>
                </Item>
            </Menu>
        </Sider>
    )
}

export default Navbar
