import s from "./../Navbar.module.css"

const Friends = (props) => {
    return (
        <div className={s.friendsList}>
            <div className={s.friend}>
                <img src={props.state[0].ava} alt="ava"/>
                <p className={s.name}>{props.state[0].name}</p>
            </div>
            <div className={s.friend}>
                <img src={props.state[1].ava} alt="ava"/>
                <p className={s.name}>{props.state[1].name}</p>
            </div>
            <div className={s.friend}>
                <img src={props.state[2].ava} alt="ava"/>
                <p className={s.name}>{props.state[2].name}</p>
            </div>
        </div>
    )
}

export default Friends