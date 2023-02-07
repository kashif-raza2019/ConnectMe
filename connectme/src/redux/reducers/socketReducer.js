const initialState = {
    socket: null,
    isConnected: false,
    isConnecting: false,
    isDisconnecting: false,
    error: null,
    room: null,
    rooms: [],
    messages: [],
}

export default function socketReducer(state = initialState, action) {
    switch (action.type) {
        case 'SOCKET_CONNECTING':
            return {
                ...state,
                isConnecting: true,
            }
        case 'SOCKET_CONNECTED':
            return {
                ...state,
                isConnecting: false,
                isConnected: true,
                socket: action.payload,
            }
        case 'SOCKET_DISCONNECTING':
            return {
                ...state,
                isDisconnecting: true,
            }
        case 'SOCKET_DISCONNECTED':
            return {
                ...state,
                isDisconnecting: false,
                isConnected: false,
                socket: null,
            }
        case 'SOCKET_ERROR':
            return {
                ...state,
                isConnecting: false,
                isDisconnecting: false,
                error: action.payload,
            }
        case 'SOCKET_ROOM':
            return {
                ...state,
                room: action.payload,
            }
        case 'SOCKET_ROOMS':
            return {
                ...state,
                rooms: action.payload,
            }
        case 'SOCKET_MESSAGES':
            return {
                ...state,
                messages: action.payload,
            }
        default:
            return state
    }
}