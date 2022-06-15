import {useForm} from "react-hook-form";
import {logIn} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import s from "./Login.module.css";
import {ErrorBorder} from "../common/FormsControls/Errors";
import React from "react";
import {Navigate} from "react-router-dom";

const LoginForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: {
            errors,
            touchedFields
        }
    } = useForm()

    const onSubmit = (formData) => {
        props.logIn(formData, setError)
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
                    style={touchedFields?.email && errors?.email && ErrorBorder(errors)}
                    {...register(
                        "email",
                        {
                            required: "This field is required",
                            onChange: clearErrorsForm
                        })}
                    placeholder={"Email"}/>
            </div>
            <div>
                <input
                    className={s.logInput}
                    style={touchedFields?.password && errors?.password && ErrorBorder(errors)}
                    {...register(
                        "password",
                        {
                            required: "This field is required",
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
                {props.captcha
                    ? <div className={s.captcha}>
                        <img src={props.captcha} alt="captcha"/>
                        <input type="text" {...register("captcha")}/>
                    </div>
                    : <div className={s.errorEmptyString}/>
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


const Login = (props) => {
    return <>
        {!props.auth.isAuth
                ? <div className={s.logFormInput}>
                    <h1>LOGIN</h1>
                    <LoginForm logIn={props.logIn} captcha={props.auth.captcha}/>
                </div>
                : <Navigate to="/profile"/>
        }
    </>
}

let mapStateToProps = (state) => ({
        auth: state.auth
    }
)


export default connect(mapStateToProps, {logIn})(Login);