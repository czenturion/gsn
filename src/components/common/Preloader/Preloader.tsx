import s from "../../Users/Users.module.css"
import spinner from "../../../assets/images/spinner.gif"
import * as React from "react"


const Preloader = () => {
    return <div className={s.spinner}><img src={spinner} alt={"spinner"}/></div>
}

export default Preloader