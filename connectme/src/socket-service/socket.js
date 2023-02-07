import io from 'socket.io-client';
import { SERVER_ENDPOINT } from './server-endpoint';
import { connect } from 'react-redux';

// If the socket is already connected then don't connect again
const socket = io(SERVER_ENDPOINT);
const createSocket = () => {
    // const socket = io(SERVER_ENDPOINT);
    return socket
}
// Connect
socket.on('connect', () => {
    console.log(socket.id);
});

// Disconnect
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Error
socket.on('connect_error', (error) => {
    console.log('Error connecting to server');
});

// 
socket.on('connect_timeout', (timeout) => {
    console.log('Timeout connecting to server');
});


export default createSocket;

// export default socket;