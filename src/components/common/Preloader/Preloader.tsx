import * as React from "react"
import {Spin} from "antd"


const Preloader = (props: any) => {
    return <Spin tip="Loading" {...props}>
        <div className="content" />
    </Spin>
}

export default Preloader