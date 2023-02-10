import {instance, ResultCodesEnum} from "./api"

type GetUsersType = {
    items: []
    totalCount: number
}

type FollowUnfollowUserType = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: object
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<FollowUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<FollowUnfollowUserType>(`follow/${id}`)
            .then(response => response.data)
    }
}