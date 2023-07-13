import {FC, useEffect, useState} from "react"
import {Controller, SubmitHandler, useForm, UseFormSetError} from "react-hook-form"
import {Button, Checkbox, Form, Image, Input, Typography} from "antd"
import Preloader from "../common/Preloader/Preloader"
import {EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined} from "@ant-design/icons"
import * as React from "react"
import s from "./Login.module.css"

const {Item} = Form
const {Text} = Typography


type LoginFormPropsType = {
    captcha: string
    isFetching: boolean
    logIn: (
        formData: FormValues,
        setError: UseFormSetError<FormValues>,
        setIsLoading: (value: boolean) => void
    ) => void
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
        handleSubmit,
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
    const rules = {required: true}
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        logIn(formData, setError, setIsLoading)
    }

    const clearErrorsForm = () => {
        if (errors && errors.serverResponse && errors.serverResponse.message!.length > 0) {
            clearErrors("serverResponse")
        }
    }

    return (
        <Form
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "200px"
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
                    rules={rules}
                    render={({field}) =>
                        <Input
                            placeholder={"Email"}
                            {...field}
                            onFocus={clearErrorsForm}
                        />
                    }
                />
            </Item>
            <Item
                validateStatus={errors?.serverResponse?.message ? "error" : ""}
                style={{
                    marginBottom: 0
                }}
            >
                <Controller
                    rules={rules}
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
                style={{
                    marginBottom: 0
                }}
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
            <Text
                className={s.error}
            >
                {
                    errors?.serverResponse?.message
                }
            </Text>
            {
                captcha
                    ? <Item
                        style={{
                            margin: 0,
                            display: "flex"
                        }}
                    >
                        <Image
                            src={captcha}
                            alt="captcha"
                            style={{
                                display: "flex"
                            }}
                        />
                        <Controller
                            rules={rules}
                            name="captcha"
                            control={control}
                            render={({field}) =>
                                <Input
                                    style={{
                                        marginTop: "16px"
                                    }}
                                    {...field}
                                />
                            }
                        />
                    </Item>
                    : <></>
            }
            <Button
                type="primary"
                htmlType="submit"
                style={{
                    width: "100%",
                    marginBottom: "15px"
                }}
                disabled={isLoading}
            >
                {
                    isLoading
                        ? <LoadingOutlined style={{ fontSize: 14 }} spin />
                        : "Login"
                }
            </Button>
        </Form>
    )
}

export default LoginForm