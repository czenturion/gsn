import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import {Routes, Route, HashRouter, Navigate} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import {Component} from "react"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import * as React from "react"
import {lazy, Suspense} from "react"

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = lazy(() => import('./components/News/News'))
const Music = lazy(() => import('./components/Music/Music'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))


class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
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
                    </div>
                </div>
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
