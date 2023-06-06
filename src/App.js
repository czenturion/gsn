import "./App.css"
import {HashRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import * as React from "react"
import {lazy, Suspense, useEffect} from "react"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import "antd/dist/reset.css"
import {Breadcrumb, Layout, Menu, theme} from "antd"
import {logOut} from "./redux/auth-reducer"
import AppHeader from "./components/Header/Header";

const { Content, Sider } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = lazy(() => import('./components/News/News'))
const Music = lazy(() => import('./components/Music/Music'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))


const App = ({ initializeApp, initialized, isAuth, login, logOut }) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const catchAllUnhandledErrors = ( reason ) => {
        alert(reason.response.data.message)
    }

    useEffect(() => {
        initializeApp()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    }, [])

    if ( !initialized ) {
        return <Preloader />
    } else {
        return (
            <Layout>
                <AppHeader isAuth={isAuth} logOut={logOut} login={login}/>
                <Layout>
                    <Sider width={200} style={{ background: colorBgContainer }}>
                        <Menu
                            mode="inline"
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%',borderRight: 0}}
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
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 540,
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
    isAuth: state.auth.isAuth,
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
