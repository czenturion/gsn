import {instance} from "./api"

type GetCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
}