import React, {useEffect, useState} from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatus = props => {
    const [
        editMode,
        toggleEditMode
    ] = useState(false)

    const [
        status,
        updateStatus
    ] = useState(props.status)

    const activateEditMode = () => {
        toggleEditMode(true)
    }

    const deactivateEditMode = () => {
        props.updateStatus(status);
        toggleEditMode(false)
    }

    const onChangeStatus = (e) => {
        updateStatus(e.currentTarget.value)
    }

    useEffect(() => {
        if (status !== props.status) {
            updateStatus(props.status)
        }
    }, [props.status])

    return (
        <div>
            {editMode && props.currentProfileAuthUser
                ?
                <input
                    type="text"
                    autoFocus={true}
                    defaultValue={props.status}
                    onBlur={deactivateEditMode}
                    onChange={onChangeStatus}
                />

                : <span
                    className={s.statusSpan}
                    onClick={activateEditMode}>
                    {status
                        ? status
                        : "set status"}</span>
            }
        </div>
    )
}


export default ProfileStatus;