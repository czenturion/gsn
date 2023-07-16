import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import userPhoto from "../../../assets/images/astroIco.jpg"
import ProfileStatus from "./ProfileStatus"
import {capitalize} from "../../../utils/helpers/helpers"
import * as React from "react"
import {FC, useState} from "react"
import {ProfileContactsType, ProfileType} from "../../../redux/profile-reducer"
import ProfileDataForm from "./ProfileDataForm"
import {UseFormSetError} from "react-hook-form"
import {Button, Card, Collapse, Image, message, Table, Upload} from "antd"
import {UploadOutlined} from "@ant-design/icons"
import type {DisableEditModeType, ProfileFormValues} from "../ProfileContainer"
import {Typography} from 'antd'

const {Title, Text, Link} = Typography

type PropsType = {
    profile: ProfileType | null
    status: string | null
    currentProfileAuthUser: boolean
    gettingUserProfileData: boolean
    uploadingData: boolean
    savePhoto: (file: any) => void
    updateProfile: (
        profileData: ProfileFormValues,
        setError: UseFormSetError<ProfileFormValues>,
        disableEditMode: DisableEditModeType) => void
    updateStatus: (newStatus: string) => void
}

const ProfileInfo: FC<PropsType> = ({
                                        profile,
                                        currentProfileAuthUser,
                                        savePhoto,
                                        status,
                                        updateProfile,
                                        updateStatus,
                                        gettingUserProfileData,
                                        uploadingData
                                    }) => {

    const [editMode, toggleEditMode] = useState(false)
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']


    const uploadUserPhoto = (info: any) => {
        savePhoto(info.file)
    }

    const beforeUpload = (file: any) => {
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`Only ${allowedTypes.join(', ')} files are allowed!`)
        }
        return isAllowedType
    }

    // this check should be because TS warns about profile might be null
    if (!profile) {
        return <div style={{height: "200px"}}><Preloader style={{marginTop: "100px"}}/></div>
    }

    return (
        <div>
            {
                gettingUserProfileData
                    ? <div style={{padding: "100px 0"}}><Preloader size="large"/></div>
                    : <div className={s.avatar}>
                        <div className={s.leftField}>
                            {
                                uploadingData
                                    ? <Preloader
                                        size="large"
                                        style={{marginTop: "150px"}}
                                    />
                                    : profile.photos.large
                                        ? <Image
                                            src={
                                                profile.photos.large
                                            }
                                            alt="ava"
                                        />
                                        : <img src={userPhoto} alt="ava"/>
                            }
                            {
                                currentProfileAuthUser && !uploadingData
                                    ? <div className={s.photoUpdateButtonField}>
                                        <Upload
                                            maxCount={1}
                                            beforeUpload={beforeUpload}
                                            customRequest={uploadUserPhoto}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined rev={undefined}/>}>
                                                Upload avatar
                                            </Button>
                                        </Upload>
                                    </div>
                                    : <></>
                            }
                        </div>
                        <Card className={s.rightField}>
                            <Title
                                level={2}
                                style={{margin: 0}}
                            >
                                {profile.fullName + " " + profile.userId}
                            </Title>
                            <br/>
                            <ProfileStatus
                                status={status}
                                updateStatus={updateStatus}
                                currentProfileAuthUser={currentProfileAuthUser}/>

                            {
                                editMode
                                    ? <ProfileDataForm
                                        profile={profile}
                                        updateProfile={updateProfile}
                                        disableEditMode={() => {
                                            toggleEditMode(false)
                                        }}/>
                                    : <ProfileData
                                        profile={profile}
                                        currentProfileAuthUser={currentProfileAuthUser}
                                        toggleEditMode={() => {
                                            toggleEditMode(true)
                                        }}/>
                            }
                        </Card>
                    </div>
            }
        </div>
    )
}

export type ProfileDataType = {
    profile: ProfileType
    currentProfileAuthUser?: boolean
    toggleEditMode?: () => void
    disableEditMode?: DisableEditModeType
    updateProfile?: (
        formValues: ProfileFormValues,
        setError: UseFormSetError<ProfileFormValues>,
        disableEditMode: DisableEditModeType) => void
}

const ProfileData: FC<ProfileDataType> = ({
                                              profile,
                                              currentProfileAuthUser,
                                              toggleEditMode
                                          }) => {

    const {contacts} = profile

    const columns = [
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
            render: (text: string) => <Text>{text}</Text>
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (text: string) => <Link href={text} target="_blank">{text}</Link>
        }
    ]

    const contactsData = Object.keys(contacts).map(key => {
        return {
            key: key,
            contact: capitalize(key),
            link: contacts[key as keyof ProfileContactsType]
        }
    })

    const profileItems = [
        {
            key: 1,
            label: "Contacts",
            children: <Table columns={columns} dataSource={contactsData} pagination={false}/>
        },
        {
            key: 2,
            label: "About Me",
            children: <p>{profile.aboutMe}</p>
        },
        {
            key: 3,
            label: "About skills",
            children: <p>{profile.lookingForAJobDescription}</p>
        }
    ]

    return <div>
        <br/>
        {
            currentProfileAuthUser && <div>
                <Button style={{width: "100px"}} onClick={toggleEditMode}>Edit</Button>
            </div>
        }
        <br/>
        <Collapse accordion items={profileItems}/>
        <br/>
        <Title level={4}>
            {
                profile.lookingForAJob
                    ? "Looking for a job!"
                    : "Not looking for a job."
            }
        </Title>
    </div>
}

export default ProfileInfo

