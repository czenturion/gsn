import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return (
		<header className={s.header}>
			<div className={s.logo}>
				<img
					src="https://icon-library.com/images/white-globe-icon/white-globe-icon-24.jpg"
					alt="logo"
					className="spinner"
				/>
				<p>Global Social Network</p>
			</div>
			<div className={s.authBlock}>
				{props.isAuth ?
					<NavLink to={"/login"}>{props.login}</NavLink> :
					<NavLink to={"/login"}>Login</NavLink>}
			</div>
		</header>
	);
};

export default Header;
