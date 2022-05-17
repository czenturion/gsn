import * as axios from "axios";

const instance = axios.create( {
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "317bb973-90bf-4ee7-8bab-322e9a369f0e"
    }
})

export const usersAPI = {
    getUsers( currentPage, pageSize ) {
        return instance.get( `users?page=${ currentPage }&count=${ pageSize }` )
            .then( response => response.data );
    },
    getUserProfile( id ) {
        return instance.get( `profile/${ id }` )
            .then( response => response.data );
    },
    followUser( id ) {
        return instance.post( `follow/${ id }` )
            .then( response => response.data );
    },
    unfollowUser( id ) {
        return instance.delete( `follow/${ id }` )
            .then( response => response.data );
    }
}

export const authAPI = {
    me() {
        return instance.get( 'auth/me' )
            .then( response => response.data );
    }
}