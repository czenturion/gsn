import * as React from "react"
import {ChangeEvent, FC, useEffect, useState} from "react"
import s from "./ProfileInfo.module.css"

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
        // todo: check up for null value
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
        <div>
            {
                editMode && currentProfileAuthUser
                    ? <input
                        type="text"
                        autoFocus={true}
                        defaultValue={String(status)}
                        onBlur={deactivateEditMode}
                        onChange={onChangeStatus}/>
                    : <span
                        className={s.statusSpan}
                        onClick={activateEditMode}>
                        {
                            localStatus
                                ? localStatus
                                : currentProfileAuthUser
                                    ? "Set status."
                                    : "Status unset."
                        }
                    </span>
            }
        </div>
    )
}

export default ProfileStatus