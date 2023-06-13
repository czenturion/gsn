import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom"
import * as React from "react"

type PropsType = {
    ava: string
    name: string
    id: number
    key: number
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialogElement}>
            <NavLink to={"/dialogs/" + props.id} style={({isActive}) => ({
                color: isActive ? '#66d801' : 'black'
            })}><img src={props.ava} alt="ava"/><div className={s.text}>{props.name}</div></NavLink>
        </div>
    )
}

export default DialogItem
