import {FC} from "react"
import s from "./ProfileInfo.module.css"
import * as React from "react"
import {useForm} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import type {ProfileDataType} from "./ProfileInfo"
import type {ProfileFormValues} from "../ProfileContainer"
import {capitalize} from "../../../utils/helpers/helpers";

const ProfileDataForm: FC<ProfileDataType> = ({profile,  updateProfile, disableEditMode}) => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            errors
        }
    } = useForm<ProfileFormValues>({defaultValues: profile, criteriaMode: "all"})

    const onSubmit: SubmitHandler<ProfileFormValues> = async (formValues) => {
        await updateProfile?.(formValues, setError, disableEditMode!)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input
                className={s.submit}
                type={"submit"}
                value={"Save"}/>
        </div>
        {
            errors
                // @ts-ignore
                ? <div style={{color: "red"}}>{errors?.profileForm?.message?.map((e, index) => <p key={index}>{e}</p>)}</div>
                : <></>
        }
        <div>
            <b>Full name: </b><input type="text" {...register("fullName")} placeholder="Your Full name"/>
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <div className={s.contact} key={key}>{capitalize(key)}: <input type="text" {...register('contacts.' + key)} placeholder="Valid url only" onChange={() => clearErrors()}/></div>
        })}
        </div>
        <div>
            <b>Do you looking for a job?</b> <input type="checkbox" {...register("lookingForAJob")}/>
        </div>
        <div>
            <b>About Me:</b> <input type="text" {...register("aboutMe")} placeholder="What about you?"/>
        </div>
        <div>
            <b>About skills:</b> <input type="text" {...register("lookingForAJobDescription")} placeholder="What about your skills?"/>
        </div>
    </form>
}

export default ProfileDataForm