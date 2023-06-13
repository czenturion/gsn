export type FriendType = {
    id: number
    name: string
    ava: string
}

const initialState = [
    {id: 1, name: "Lora", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922748.png"},
    {id: 2, name: "Mom", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922558.png"},
    {id: 3, name: "Dad", ava: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png"}
]

// Формирование списка друзей для Navbar
const sidebarReducer = (state = initialState): FriendType[] => {
    return state
}

export default sidebarReducer