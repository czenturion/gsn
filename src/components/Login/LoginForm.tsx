import {FC, useEffect} from "react"
import {Controller, SubmitHandler, useForm, UseFormSetError} from "react-hook-form"
import {Button, Checkbox, Form, Input, Typography} from "antd"
import Preloader from "../common/Preloader/Preloader"
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons"
import s from "./Login.module.css"
import * as React from "react"

const {Title} = Typography
const {Item} = Form


type LoginFormPropsType = {
    captcha: string
    isFetching: boolean
    logIn: (formData: FormValues, setError: UseFormSetError<FormValues>) => void
}

export type FormValues = {
    serverResponse?: string[]
    email: string
    password: string
    captcha: string
    rememberMe: boolean
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

    const [form] = Form.useForm()

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
            }}
            onFinish={handleSubmit(onSubmit)}
            form={form}
        >
            <Item
                validateStatus={errors?.serverResponse?.message ? "error" : ""}
            >
                <Controller
                    name={"email"}
                    control={control}
                    rules={{ required: true }}
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
                    rules={{ required: true}}
                    name={"password"}
                    control={control}
                    render={({field}) =>
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            placeholder={"Password"}
                            {...field}
                            onFocus={clearErrorsForm}
                        />
                    }
                />
            </Item>
            <Item
                // validateStatus={errors?.serverResponse?.message ? "error" : ""}
                // help={errors?.serverResponse?.message ? "Email or Password is wrong" : ""}
            >
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
                        <Input
                            type="text"
                        />
                    </div>
                    : <></>
            }
        </Form>
    )
}

export default LoginForm