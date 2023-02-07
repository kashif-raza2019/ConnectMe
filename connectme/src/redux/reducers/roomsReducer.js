import {SET_ROOMS} from '../enums';

const initialState = {
    rooms: [],
}

export default function roomsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.payload,
            }
        default:
            return state;
    }
}
