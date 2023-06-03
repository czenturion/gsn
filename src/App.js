import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import {HashRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import * as React from "react"
import {Component, lazy, Suspense} from "react"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import "antd/dist/reset.css"
import { Breadcrumb, Layout, Menu, SubMenu, theme } from "antd"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons"

const { Header, Content, Sider } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = lazy(() => import('./components/News/News'))
const Music = lazy(() => import('./components/Music/Music'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

class App extends Component {

    catchAllUnhandledErrors = (promise) => {
        alert(promise.reason.response.data.message)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <Layout>
                    <Header style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="demo-logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: 'white' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.SubMenu key="sub1" title="My Profile">
                                    <Menu.Item key="1">
                                        <NavLink to="/profile" style={({isActive}) => ({
                                            color: isActive ? 'blue' : 'black'
                                        })}>Profile</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <NavLink to="/dialogs" style={({isActive}) => ({
                                            color: isActive ? 'blue' : 'black'
                                        })}>Messages</NavLink>
                                    </Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu key="sub2" title="Developers">
                                    <Menu.Item className="Item">
                                        <NavLink to="/users" style={({isActive}) => ({
                                            color: isActive ? 'blue' : 'black'
                                        })}>Find users</NavLink>
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                    background: 'white',
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
                // <div className="app-wrapper">
                //     <HeaderContainer/>
                //     <Navbar/>
                //     <div className="app-wrapper-content">
                //         <Suspense fallback={<Preloader/>}>
                //             <Routes>
                //                 <Route path="/" element={<Navigate to={"/profile"}/>}/>
                //                 <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                //                 <Route path="/profile" element={<ProfileContainer/>}/>
                //                 <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                //                 <Route path="/news" element={<News/>}/>
                //                 <Route path="/music" element={<Music/>}/>
                //                 <Route path="/settings" element={<Settings/>}/>
                //                 <Route path="/users" element={<UsersContainer/>}/>
                //                 <Route path="/login" element={<Login/>}/>
                //                 <Route path="*" element={<NotFound/>}/>
                //             </Routes>
                //          </Suspense>
                //     </div>
                // </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    authIsFetching: state.auth.isFetching
})

const AppContainer = connect(mapStateToProps, {initializeApp})(App)

const MainApp = () => {
    return <HashRouter basename="/">
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp
