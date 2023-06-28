import "./App.css"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import * as React from "react"
import {lazy, Suspense, useEffect} from "react"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import "antd/dist/reset.css"
import {Breadcrumb, Layout, theme} from "antd"
import Navbar from "./components/Navbar/Navbar"
import {logOut} from "./redux/auth-reducer"
import {AppHeader} from "./components/Header/AppHeader"

const { Content } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = lazy(() => import('./components/News/News'))
const Music = lazy(() => import('./components/Music/Music'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))


const App = ({ initializeApp, initialized, authIsFetching, logOut }) => {

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
        return <Preloader size="large" style={{margin: "200px 300px 0 0"}}/>
    } else {
        return (
            <Layout className="app-wrapper">
                <AppHeader logOut={logOut}/>
                <Layout>
                    <Navbar colorBgContainer={colorBgContainer} />
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 540,
                                background: colorBgContainer,
                            }}
                        >
                            {
                                authIsFetching
                                    ? <Preloader size="large" style={{padding: "200px 0"}}/>
                                    : <Suspense fallback={<Preloader size="large" style={{padding: "200px 0"}}/>}>
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
                            }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    authIsFetching: state.auth.isFetching
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
