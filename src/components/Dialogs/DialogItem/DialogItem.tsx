import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom"
import * as React from "react"
import {Card} from "antd";

type PropsType = {
    ava: string
    name: string
    id: number
    key: number
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div
            className={s.dialogElement}
        >
            <NavLink
                to={"/dialogs/" + props.id}
                style={({isActive}) => ({
                color: isActive ? '#66d801' : 'black'
            })}>
                <Card>
                    <img
                        src={props.ava}
                        alt="ava"
                    />
                    <div
                        className={s.text}>
                        {props.name}
                    </div>
                </Card>
            </NavLink>
        </div>
    )
}

export default DialogItem
