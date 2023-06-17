import * as React from "react"
import {Spin} from "antd"


const Preloader = () => {
    return <Spin tip="Loading" size="large" style={{marginTop: "30%"}}>
        <div className="content" />
    </Spin>
}

export default Preloader