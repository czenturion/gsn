import {useForm, UseFormSetError} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import {InitialAuthStateType, logIn} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import s from "./Login.module.css"
import {ErrorBorderOutline} from "../common/FormsControls/Errors"
import * as React from "react"
import {Navigate} from "react-router-dom"
import {FC} from "react"
import {AppStateType} from "../../redux/redux-store"

type FormValues = {
    serverResponse?: string[]
    email: string
    password: string
    captcha: string
    rememberMe: boolean
}

type LoginFormPropsType = {
    captcha: string
    logIn: (formData: FormValues, setError: UseFormSetError<FormValues>) => void
}

const LoginForm: FC<LoginFormPropsType> = ({logIn, captcha}) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: {
            errors
        }
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        logIn(formData, setError)
        reset()
        return <Navigate to="/profile/"/>
    }

    const clearErrorsForm = () => {
        if (errors && errors.serverResponse && errors.serverResponse.message!.length > 0) {
            clearErrors("serverResponse")
        }
    }

    return (
        <form
            className={s.logForm}
            onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    className={s.logInput}
                    style={errors?.email && ErrorBorderOutline(errors)}
                    {...register(
                        "email",
                        {
                            required: true,
                            onChange: clearErrorsForm
                        })}
                    placeholder={"Email"}/>
            </div>
            <div>
                <input
                    className={s.logInput}
                    style={errors?.password && ErrorBorderOutline(errors)}
                    {...register(
                        "password",
                        {
                            required: true,
                            onChange: clearErrorsForm
                        })}
                    placeholder={"Password"}
                    type={"password"}/>
            </div>
            <div className={s.rememberMe}>
                <input
                    {...register("rememberMe")}
                    type={"checkbox"}/>
                <p>Remember me</p>
            </div>
            <div>
                {
                    captcha
                        ? <div className={s.captcha}>
                            <img src={captcha} alt="captcha"/>
                            <input
                                type="text"
                                {...register("captcha",
                                    {required: true})}/>
                        </div>
                        : <></>
                }
            </div>
            <div>
                <input
                    className={s.submit}
                    type={"submit"}/>
            </div>
            <div>
                {
                    errors?.serverResponse?.message
                        ? <p style={{color: "red"}}>{errors.serverResponse.message}</p>
                        : <div className={s.errorEmptyString}/>
                }
            </div>
        </form>
    )
}

type LoginPropsType = {
    auth: InitialAuthStateType
}

type LoginDispatchType = {
    logIn: (formData: FormValues, setError: UseFormSetError<FormValues>) => void
}

type LoginPropsAndDispatchType = LoginPropsType & LoginDispatchType

const Login: FC<LoginPropsAndDispatchType> = ({auth, logIn}) => {
    return <>
        {
            !auth.isAuth
                ? <div className={s.logFormInput}>
                    <h1>LOGIN</h1>
                    <LoginForm logIn={logIn} captcha={auth.captcha}/>
                </div>
                : <Navigate to="/profile"/>
        }
    </>
}

let mapStateToProps = (state: AppStateType): LoginPropsType => ({
        auth: state.auth
    }
)

export default connect<LoginPropsType, LoginDispatchType, {}, AppStateType>(mapStateToProps, {logIn})(Login)