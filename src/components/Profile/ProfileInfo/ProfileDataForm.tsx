import {FC} from "react"
import s from "./ProfileInfo.module.css"
import * as React from "react"
import type {ProfileDataType, ProfileFormValues} from "./ProfileInfo"
import {useForm} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"

const ProfileDataForm: FC<ProfileDataType> = ({profile, disableEditMod, updateProfile}) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors
        }
    } = useForm<ProfileFormValues>({defaultValues: profile})

    const onSubmit: SubmitHandler<ProfileFormValues> = (formValues) => {
        if (updateProfile && disableEditMod) {
            updateProfile(formValues, setError)
            disableEditMod()
        }
    }
    console.log(errors)

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input
                className={s.submit}
                type={"submit"}
                value={"Save"}/>
        </div>
        {
            errors?.serverResponse?.message
                ? <p style={{color: "red"}}>{errors.serverResponse.message[0]}</p>
                : <></>
        }
        <div>
            <b>Full name: </b><input type="text" {...register("fullName")} placeholder="Your Full name"/>
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <div className={s.contact} key={key}>{key}: <input type="text" {...register('contacts.' + key)}/></div>
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