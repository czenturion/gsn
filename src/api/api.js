import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "1866b716-bc7d-42d6-af46-4e7775bb2540"
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    }
}

export const profileAPI = {
    getUserProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },
    getUserStatus(id) {
        return instance.get(`profile/status/${id}`)
            .then(response => response.data);
    },
    updateUserStatus(status) {
        return instance.put('profile/status', {status});
    }
}

export const authAPI = {
    me() {
        return instance.get('auth/me')
            .then(response => response.data);
    },
    login(formData) {
        return instance.post('auth/login', formData)
            .then(response => response.data);
    },
    logout() {
        return instance.post('auth/logout')
            .then(response => response.data)
    },
    captcha() {
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    }
}