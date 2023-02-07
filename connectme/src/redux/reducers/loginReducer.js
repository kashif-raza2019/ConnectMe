import { LOGIN, LOGOUT } from '../enums'

const initialState = {
    isLoggedIn: false,
    name: '',
    username: '',
    password: '',
    userid: 0,
}


export default loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.username,
                username: action.payload.password,
                password: action.payload.name,
                userid: action.payload.userid,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                name: "",
                username: "",
                password: "",
                userid: "",
            }
        default:
            return state
    }
}