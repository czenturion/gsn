import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import {Routes, Route} from "react-router-dom"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/Login"
import {Component} from "react"
import {connect} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"

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
                        {
                            this.props.authIsFetching
                                ? <Preloader/>
                                : <Routes>
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
                        }
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

export default connect(mapStateToProps, {initializeApp})(App)
