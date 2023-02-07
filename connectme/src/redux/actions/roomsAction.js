import { SET_ROOMS } from "../enums";

export const addSocketRoomAction = (action) => {
    return {
        type: SET_ROOMS,
        payload: action,
    };
};
