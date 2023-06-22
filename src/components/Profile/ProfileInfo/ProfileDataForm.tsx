import * as React from "react"
import {FC, useEffect} from "react"
import type {SubmitHandler} from "react-hook-form"
import {useForm, Controller} from "react-hook-form"
import type {ProfileDataType} from "./ProfileInfo"
import type {ProfileFormValues} from "../ProfileContainer"
import {Button, Checkbox, Form, Input, Space, Typography} from "antd"

const {Title} = Typography
const {Item} = Form

const ProfileDataForm: FC<ProfileDataType> = ({ profile,  updateProfile, disableEditMode }) => {
    const contacts = profile.contacts
    const rules: any = [{ type: 'url', warningOnly: true }]

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        control,
        formState: {
            errors
        }
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

    return <Form
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
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
            style={{
                textAlign: "center"
            }}
        >
            Contacts:
        </Title>
        <Item
            label="Facebook"
            rules={rules}
        >
            <Controller
                name="contacts.facebook"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Website"
            rules={rules}
        >
            <Controller
                name="contacts.website"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Vk"
            rules={rules}
        >
            <Controller
                name="contacts.vk"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Twitter"
            rules={rules}
        >
            <Controller
                name="contacts.twitter"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Instagram"
            rules={rules}
        >
            <Controller
                name="contacts.instagram"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Youtube"
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
                    />
                }
            />
        </Item>
        <Item
            label="Github"
            rules={rules}
        >
            <Controller
                name="contacts.github"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
                    />
                }
            />
        </Item>
        <Item
            label="Mainlink"
            rules={rules}
        >
            <Controller
                name="contacts.mainLink"
                control={control}
                render={({field}) =>
                    <Input
                        type="text"
                        placeholder="Valid url only"
                        {...field}
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