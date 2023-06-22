import * as React from "react"
import { ChangeEvent, FC, useEffect, useState } from "react"
import s from "./ProfileInfo.module.css"
import {Input, Typography} from 'antd'

const { Title } = Typography

type PropsType = {
    status: string | null
    currentProfileAuthUser: boolean
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = ({status, currentProfileAuthUser, updateStatus}) => {
    const [
        editMode,
        toggleEditMode
    ] = useState(false)

    const [
        localStatus,
        updateLocalStatus
    ] = useState(status)

    const activateEditMode = () => {
        if (currentProfileAuthUser) {
            toggleEditMode(true)
        }
    }

    const deactivateEditMode = () => {
        // todo: find out about null value here
        updateStatus(String(localStatus))
        toggleEditMode(false)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        updateLocalStatus(e.currentTarget.value)
    }

    useEffect(() => {
        if (localStatus !== status) {
            updateLocalStatus(status)
        }
    }, [status])

    return (
        <div className={s.status}>
            {
                editMode && currentProfileAuthUser
                    ? <Input
                        type="text"
                        autoFocus={true}
                        defaultValue={String(status)}
                        onBlur={deactivateEditMode}
                        onChange={onChangeStatus}
                        maxLength={100}/>
                    : <Title
                        level={4}
                        style={{margin: 0}}
                    >
                        <span
                            className={currentProfileAuthUser ? s.statusSpan : undefined}
                            onClick={activateEditMode}>
                            {
                                localStatus
                                    ? localStatus
                                    : currentProfileAuthUser
                                        ? "Set status."
                                        : "Status unset."
                            }
                        </span>
                    </Title>
            }
        </div>
    )
}

export default ProfileStatus