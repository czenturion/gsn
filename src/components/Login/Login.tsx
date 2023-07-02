import {useForm, UseFormSetError, Controller} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import {InitialAuthStateType, logIn} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import s from "./Login.module.css"
import * as React from "react"
import {Navigate} from "react-router-dom"
import {FC, useEffect} from "react"
import {AppStateType} from "../../redux/redux-store"
import Preloader from "../common/Preloader/Preloader"
import {Button, Checkbox, Form, Input} from "antd"
import {Typography} from "antd"

const {Title} = Typography
const {Item} = Form

export type FormValues = {
    serverResponse?: string[]
    email: string
    password: string
    captcha: string
    rememberMe: boolean
}

type LoginFormPropsType = {
    captcha: string
    isFetching: boolean
    logIn: (formData: FormValues, setError: UseFormSetError<FormValues>) => void
}

const LoginForm: FC<LoginFormPropsType> = ({logIn, captcha, isFetching}) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        control,
        formState: {
            errors
        }
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
            captcha: "",
            rememberMe: false
        }
    })

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        logIn(formData, setError)
        // return <Navigate to="/profile/"/>
    }

    useEffect(() => {
        console.log(errors, "form errors")
        if (errors.serverResponse) {
            console.log(errors.serverResponse, "++++")
        }
    }, [errors])



    const clearErrorsForm = () => {
        if (errors && errors.serverResponse && errors.serverResponse.message!.length > 0) {
            clearErrors("serverResponse")
        }
    }

    if (isFetching) return <Preloader/>

    return (
        <Form
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textAlign: "center"
            }}
            onFinish={handleSubmit(onSubmit)}>
            <Item>
                <Controller
                    name={"email"}
                    control={control}
                    render={({field}) =>
                        <Input
                            placeholder={"Email"}
                            {...field}
                            onFocus={clearErrorsForm}
                        />
                    }
                />
            </Item>
            <Item>
                <Controller
                    name={"password"}
                    control={control}
                    render={({field}) =>
                        <Input
                            placeholder={"Password"}
                            {...field}
                            onFocus={clearErrorsForm}
                        />
                    }
                />
            </Item>
            {
                errors?.serverResponse?.message
                    ? <p style={{color: "red"}}>{errors.serverResponse.message}</p>
                    : <></>
            }
            <Item
                validateStatus={errors?.serverResponse?.message ? "error" : ""}
                help={errors?.serverResponse?.message ? "Email or Password is wrong" : ""}>
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({field}) =>
                        <Checkbox
                            {...field}
                        >
                            Remember Me
                        </Checkbox>
                    }
                />
            </Item>
            <Button
                type="primary"
                htmlType="submit"
                style={{width: "100%"}}
            >
                Login
            </Button>
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
        </Form>
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
                    <Title level={3}>LOGIN</Title>
                    <br/>
                    <br/>
                    <LoginForm logIn={logIn} captcha={auth.captcha} isFetching={auth.isFetching}/>
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