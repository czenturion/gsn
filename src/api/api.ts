import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "1866b716-bc7d-42d6-af46-4e7775bb2540"
    }
})

export type DefaultResponseResultObject = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {
        userId: number
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

