import {FC, useEffect} from "react"
import {Controller, SubmitHandler, useForm, UseFormSetError} from "react-hook-form"
import {Button, Checkbox, Form, Input, Typography} from "antd"
import Preloader from "../common/Preloader/Preloader"
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons"
import * as React from "react"

const {Item} = Form
const {Text} = Typography


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
    const rules = {required: true}

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        logIn(formData, setError)
        // return <Navigate to="/profile/"/>
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
            {
                errors?.serverResponse?.message
                    ? <Text type="danger">{errors?.serverResponse?.message}</Text>
                    : ""
            }
            <Item>
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
            {
                captcha
                    ? <Item>
                        <img src={captcha} alt="captcha"/>
                        <Controller
                            rules={rules}
                            name="captcha"
                            control={control}
                            render={({field}) =>
                                <Input
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
                    width: "100%"
                }}
            >
                Login
            </Button>
        </Form>
    )
}

export default LoginForm