import * as React from "react"
import {FC, useEffect} from "react"
import type {SubmitHandler} from "react-hook-form"
import {useForm, Controller} from "react-hook-form"
import type {ProfileDataType} from "./ProfileInfo"
import type {ProfileFormValues} from "../ProfileContainer"
import {Button, Checkbox, Form, Input, Space, Typography} from "antd"
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const {Title} = Typography
const {Item} = Form

const ProfileDataForm: FC<ProfileDataType> = ({ profile,  updateProfile, disableEditMode }) => {
    const contacts = profile.contacts
    const rules: any = [{ type: 'url', warningOnly: true }]
    const [form] = Form.useForm()

    const {
        handleSubmit,
        setError,
        control,
        formState,
        clearErrors
    } = useForm<ProfileFormValues>({
        defaultValues: {
            fullName: profile.fullName,
            contacts: {
                facebook: contacts.facebook,
                website: contacts.website,
                vk: contacts.vk,
                twitter: contacts.twitter,
                instagram: contacts.instagram,
                youtube: contacts.youtube,
                github: contacts.github,
                mainLink: contacts.mainLink
            },
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe
        }
    })

    const onSubmit: SubmitHandler<ProfileFormValues> = (formValues) => {
        updateProfile?.(formValues, setError, disableEditMode!)
    }

    useEffect(() => {
        console.log(formState.errors)
    }, [formState.errors])

    const onFocus = (data: any) => {
        console.log(data)
        if (formState) {
            clearErrors("profileForm")
        }
    }

    return <Form
        onFinish={handleSubmit(onSubmit)}
        wrapperCol={{ span: 18 }}
        layout="vertical"
        form={form}
    >
        <br/>
        <Space>
            <Button
                type="primary"
                htmlType="submit"
                style={{width: "100px", marginRight: "10px"}}
            >
                Save
            </Button>
            <Button onClick={disableEditMode}>Exit edit mod</Button>
        </Space>
        <br/>
        <br/>
        <Item
            label="Full name:"
        >
            <Controller
                name="fullName"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Your Full name"
                        {...field}
                    />
                }
            />
        </Item>
        <Title
            level={3}
        >
            Contacts:
        </Title>
        <Item
            label="Facebook"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Facebook") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Facebook") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.facebook"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Website"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Website") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Website") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.website"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Vk"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Vk") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Vk") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.vk"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Twitter"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Twitter") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Twitter") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.twitter"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Instagram"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Instagram") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Instagram") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.instagram"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Youtube"
            validateStatus={formState.errors?.profileForm?.message?.includes("Youtube") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Youtube") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.youtube"
                control={control}
                rules={rules}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Github"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Github") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Github") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.github"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Mainlink"
            rules={rules}
            validateStatus={formState.errors?.profileForm?.message?.includes("Mainlink") ? "error" : ""}
            help={formState.errors?.profileForm?.message?.includes("Mainlink") ? "Not valid url" : ""}
        >
            <Controller
                name="contacts.mainLink"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                        onFocus={onFocus}
                    />
                }
            />
        </Item>
        <Item
            label="Looking for a job?"
        >
            <Controller
                name="lookingForAJob"
                control={control}
                render={({field}) =>
                    <Checkbox
                        defaultChecked={profile.lookingForAJob}
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="What about you?"
        >
            <Controller
                name="aboutMe"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="What about your skills?"
        >
            <Controller
                name="lookingForAJobDescription"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        {...field}
                    />
                }
            />
        </Item>
    </Form>
}

export default ProfileDataForm