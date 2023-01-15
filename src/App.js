import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import {Routes, Route, BrowserRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import {Component} from "react"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import * as React from "react"

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const News = React.lazy(() => import('./components/News/News'))
const Music = React.lazy(() => import('./components/Music/Music'))
const Settings = React.lazy(() => import('./components/Settings/Settings'))
const Login = React.lazy(() => import('./components/Login/Login'))


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
                        <React.Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path="/" element={<ProfileContainer/>}/>
                                <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                <Route path="/profile" element={<ProfileContainer/>}/>
                                <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/music" element={<Music/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/users" element={<UsersContainer/>}/>
                                <Route path="/login" element={<Login/>}/>
                            </Routes>
                        </React.Suspense>
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

const MainApp = (props) => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
