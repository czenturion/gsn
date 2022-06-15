import React, {useEffect, useState} from "react";
import s from "./ProfileInfo.module.css";
import {useForm} from "react-hook-form";

const ProfileStatus = props => {
    const [
        editMode,
        toggleEditMode
    ] = useState(false)

    const [
        status,
        updateStatus
    ] = useState(props.status)

    const {
        register,
        getValues,
        formState: {errors}
    } = useForm();

    const maxStatusLengthValue = 20;

    const activateEditMode = () => {
        toggleEditMode(true)
    }

    const deactivateEditMode = () => {
        props.updateStatus(getValues().status);
        toggleEditMode(false)
    }

    useEffect(() => {
        if (status !== props.status) {
            updateStatus(props.status)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {editMode
                ? <form>
                    <input
                        type="text"
                        {...register("status", {
                            required: true,
                            maxLength: {
                                value: maxStatusLengthValue,
                                message: `Max length ${maxStatusLengthValue} symbols`
                            }
                        })}
                        autoFocus={true}
                        defaultValue={props.status}
                        onBlur={deactivateEditMode}
                    />
                    {errors?.message && <p>{errors?.message?.message}</p>}
                </form>
                : <span
                    className={s.statusSpan}
                    onClick={activateEditMode}>
                    {props.status
                        ? props.status
                        : "set status"}</span>
            }
        </div>
    )
}

export default ProfileStatus;