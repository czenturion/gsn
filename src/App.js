import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import { HashRouter, Navigate, NavLink, Route, Routes } from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import * as React from "react"
import { Component, lazy, Suspense, useEffect, useState } from "react"
import { connect, Provider } from "react-redux"
import { initializeApp } from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import "antd/dist/reset.css"
import { Breadcrumb, Layout, Menu, SubMenu, theme } from "antd"
import { logOut } from "./redux/auth-reducer"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons"
import s from "./components/Header/Header.module.css"

const { Header, Content, Sider } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = lazy(() => import('./components/News/News'))
const Music = lazy(() => import('./components/Music/Music'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))


const App = ({ initializeApp, initialized, login, logOut }) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const catchAllUnhandledErrors = ( promise ) => {
        alert(promise.reason.response.data.message)
    }

    useEffect(() => {
        initializeApp()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    }, [] )

    if ( !initialized ) {
        return <Preloader />
    } else {
        return (
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: 'white' }}>
                        { login }
                    </div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="head1">
                            <span onClick={ logOut }>Log Out</span>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={ 200 } style={{ background: colorBgContainer }}>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.SubMenu key="sub1" title="My Profile">
                                <Menu.Item key="1">
                                    <NavLink to="/profile" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black'
                                    })}><UserOutlined></UserOutlined> Profile</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink to="/dialogs" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black'
                                    })}>Messages</NavLink>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <NavLink to="/music" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black'
                                    })}>Music</NavLink>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="sub2" title="Developers">
                                <Menu.Item key="4">
                                    <NavLink to="/users" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black'
                                    })}>Find users</NavLink>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <NavLink to="/settings" style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black'
                                    })}>Settings</NavLink>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="6">
                                <NavLink to="/news" style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'black'
                                })}>News</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 580,
                                background: colorBgContainer,
                            }}
                        >
                            <Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route path="/" element={<Navigate to={"/profile"}/>}/>
                                    <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                    <Route path="/profile" element={<ProfileContainer/>}/>
                                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                                    <Route path="/news" element={<News/>}/>
                                    <Route path="/music" element={<Music/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/users" element={<UsersContainer/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="*" element={<NotFound/>}/>
                                </Routes>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    authIsFetching: state.auth.isFetching,
    login: state.auth.login
})

const AppContainer = connect(mapStateToProps, {initializeApp, logOut})(App)

const MainApp = () => {
    return <HashRouter basename="/">
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp
