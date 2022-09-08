import {useForm} from "react-hook-form"
import {logIn} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import s from "./Login.module.css"
import {ErrorBorderOutline} from "../common/FormsControls/Errors"
import React from "react"
import {Navigate} from "react-router-dom"

const LoginForm = ({logIn, captcha}) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: {
            errors
        }
    } = useForm()

    const onSubmit = (formData) => {
        logIn(formData, setError)
        reset()
        return <Navigate to="/profile/"/>
    }

    const clearErrorsForm = () => {
        if (errors?.serverResponse?.message.length > 0) {
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
                {captcha
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
                {errors?.serverResponse?.message
                    ? <p style={{color: "red"}}>{errors?.serverResponse?.message}</p>
                    : <div className={s.errorEmptyString}/>
                }
            </div>
        </form>
    )
}

const Login = ({auth, logIn}) => {
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

let mapStateToProps = (state) => ({
        auth: state.auth
    }
)

export default connect(mapStateToProps, {logIn})(Login)