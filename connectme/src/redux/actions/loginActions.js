import { LOGIN, LOGOUT } from "../enums";

export const login = (username, password, name, userid) => {
    console.log("username", username);
    console.log("password", password);
    console.log("name", name);
    console.log("userid", userid);
    return {
        type: LOGIN,
        payload: { 
            username: username,
            password: password,
            name: name,
            userid: userid,
        },
    };
};


export const logout = () => {
    console.log("Logout");
    return {
        type: LOGOUT,
    };
};
