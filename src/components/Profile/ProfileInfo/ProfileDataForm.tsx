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
            fullName: profile.fullName
        }
    })
    const [form] = Form.useForm()
    const contacts = profile.contacts

    const  initialValues = {
        "fullName": profile.fullName,
        "facebook": contacts.facebook,
        "website": contacts.website,
        "vk": contacts.vk,
        "twitter": contacts.twitter,
        "instagram": contacts.instagram,
        "youtube": contacts.youtube,
        "github": contacts.github,
        "mainLink": contacts.mainLink,
        "lookingForAJob": profile.lookingForAJob,
        "lookingForAJobDescription": profile.lookingForAJobDescription,
        "aboutMe": profile.aboutMe
    }

    const rules: any = [{ type: 'url', warningOnly: true }]

    const onSubmit: SubmitHandler<ProfileFormValues> = (formValues) => {
        // updateProfile?.(formValues, setError, disableEditMode!)
        console.log(formValues)
    }

    useEffect(() => {
        register("fullName")
        register("contacts.facebook")
        register("contacts.website")
        register("contacts.vk")
        register("contacts.twitter")
        register("contacts.instagram")
        register("contacts.youtube")
        register("contacts.github")
        register("contacts.mainLink")
        register("lookingForAJob")
        register("lookingForAJobDescription")
        register("aboutMe")
    })

    return <Form
        onFinish={handleSubmit(onSubmit)}
        form={form}
        initialValues={initialValues}
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
            name="fullName"
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
        <Title level={3}
               style={{marginLeft: "80px"}}
        >
            Contacts:
        </Title>
        <Item name="facebook"
              label="Facebook"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"
            />
        </Item>
        <Item name="website"
              label="Website"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"
            />
        </Item>
        <Item name="vk"
              label="Vk"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="twitter"
              label="Twitter"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="instagram"
              label="Instagram"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="youtube"
              label="Youtube"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="github"
              label="Github"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="mainLink"
              label="Mainlink"
              rules={rules}
        >
            <Input
                type="text"
                placeholder="Valid url only"/>
        </Item>
        <Item name="lookingForAJob"
              valuePropName="checked"
              label="Looking for a job?"
              style={{marginLeft: "100px"}}
        >
            <Checkbox style={{marginLeft: "20px"}}/>
        </Item>
        <Item name="aboutMe"
              label="What about you?"
        >
            <Input
                type="text"
                name="aboutMe"
                placeholder="Valid url only"
            />
        </Item>
        <Item name="lookingForAJobDescription"
              label="What about your skills?"
        >
            <Input
                type="text"
                name="aboutMe"
                placeholder="Valid url only"
            />
        </Item>
    </Form>
}

export default ProfileDataForm