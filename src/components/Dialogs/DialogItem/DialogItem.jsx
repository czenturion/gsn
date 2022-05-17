import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={s.dialogElement}>
            <NavLink to={"/dialogs/" + props.id} style={({isActive}) => ({
                color: isActive ? '#66d801' : 'black'
            })}><img src={props.ava} alt="ava"/><div className={s.text}>{props.name}</div></NavLink>
        </div>
    )
}

export default DialogItem;
