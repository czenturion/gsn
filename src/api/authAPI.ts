import {FormValues} from "../components/Login/Login"
import {instance, ResultCodesEnum} from "./api"

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: string[]
}
type LoginResponseType = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodesEnum
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
            .then(response => response.data)
    },
    login(formData: FormValues) {
        return instance.post<LoginResponseType>('auth/login', formData)
            .then(response => response.data)
    },
    logout() {
        return instance.post<LogoutResponseType>('auth/logout')
            .then(response => response.data)
    }
}