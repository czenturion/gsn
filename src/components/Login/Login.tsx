import {UseFormSetError} from "react-hook-form"
import {InitialAuthStateType, logIn} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import * as React from "react"
import {FC} from "react"
import {Navigate} from "react-router-dom"
import {AppStateType} from "../../redux/redux-store"
import {Form, Typography} from "antd"
import LoginForm from "./LoginForm"

const {Title} = Typography

export type FormValues = {
    serverResponse?: string[]
    email: string
    password: string
    captcha: string
    rememberMe: boolean
}

type LoginPropsType = {
    auth: InitialAuthStateType
}

type LoginDispatchType = {
    logIn: (
        formData: FormValues,
        setError: UseFormSetError<FormValues>,
        setIsLoading: (value: boolean) => void
    ) => void
}

type LoginPropsAndDispatchType = LoginPropsType & LoginDispatchType

const Login: FC<LoginPropsAndDispatchType> = ({auth, logIn}) => {
    return <div>
        {
            !auth.isAuth
                ? <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center"
                    }}
                >
                    <Title
                        level={3}
                        style={{
                            margin: "30px 0 30px"
                        }}
                    >
                        LOGIN
                    </Title>
                    <LoginForm
                        logIn={logIn}
                        captcha={auth.captcha}
                        isFetching={auth.isFetching}
                    />
                </div>
                : <Navigate to="/profile"/>
        }
    </div>
}

let mapStateToProps = (state: AppStateType): LoginPropsType => ({
        auth: state.auth
    }
)

export default connect<
    LoginPropsType,
    LoginDispatchType,
    {},
    AppStateType
    >(mapStateToProps, {logIn})(Login)