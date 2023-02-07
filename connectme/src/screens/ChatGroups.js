import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SERVER_ENDPOINT } from '../socket-service/server-endpoint';
import createSocket, { socket } from '../socket-service/socket';
import CreateRoomModal from '../components/CreateRoomModal';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

const ChatGroups = props => {
    const socket = createSocket();
    const [visible, setVisible] = useState(false);
    const [enterRoom, setEnterRoom] = useState(false);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    console.log(room,'-=-=s');
    const handleOpenChatMsg = room => {
        console.log('Room', room);
        setRoom(room);
        setEnterRoom(true);
    };
    const roomsFromState = useSelector(state => state.roomsReducer.rooms);
    console.log('hii');
    const fetchGroupsData = async () => {
        const response = await fetch(SERVER_ENDPOINT + '/api');
        const data = await response.json();
        setRooms(data);
    };
    useEffect(() => {
        fetchGroupsData();
    }, [])

    // socket?.on('connect_error', (err) => {
    //     Alert.alert('Error', 'Unable to connect to server');
    // })

    socket?.on('roomsList', rooms => {
        console.log('roomsList', rooms);
        setRooms(rooms);
    });

    socket?.on('newMessage', data => {
        console.log('New Message Return', data);
        setMessages([...messages, data]);
    });

    socket?.on("connect", () => {
        console.log("Connected to server");
    });
    socket?.on('roomsList', rooms => {
        console.log('roomsList', rooms);
        setRooms(rooms);
    });

    socket?.on('deleteRoom', data => {
        console.log('Delete Room', data);
        setRooms(rooms.filter(room => room.id !== data.room.id));
    });



    const handleCreateGroup = () => setVisible(true);
    const generateID = () => Math.random().toString(36).substring(2, 10);

    const sendMessage = () => {
        if (message === '' || message === null || message === undefined) {
            Alert.alert('Please enter a message', 'Message cannot be empty');
        } else {
            const room_id = room?.id;
            const user_id = socket?.id;
            socket?.emit('newMessage', { room_id: room_id, message, user: user_id });
            const hour = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
            const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;    
            const data = {
                id: generateID(),
                text: message,
                user: user_id,
                time: `${hour}:${mins}`,
            }
            // setMessages([...messages, data]);
            setRoom({
                ...room,
                messages: [...room.messages, data]
            })
        }
        setMessage('');
    };

    const handleDeleteRoom = () => {
        socket?.emit('deleteRoom', { room_id: room?.id });
        setEnterRoom(false);
    };

    return (
        <>
            {/* 
                Chat Application: Number of Rooms 
            */}
            <View
                style={{
                    padding: 10,
                }}>
                {enterRoom ? (
                    <View
                    >
                        <Text>
                            <Button
                                onPress={() => setEnterRoom(false)}
                                mode="contained"
                                icon="arrow-left">
                                Back
                            </Button>
                            </Text>
                            <Text>
                            <Button
                                onPress={() => handleDeleteRoom()}
                                mode="contained"
                                icon="delete"
                                style={{
                                    backgroundColor: 'red',
                                    color: '#fff',
                                }}
                                
                                >
                                Delete Room
                            </Button>
                        </Text>
                            {/* 
                        Chat Application Messages
                    */}
                    <View style={{ 
                        flex: 1,
                        height: "auto",
                        width: "100%",
                        minHeight: 500,
                        maxHeight: 700,
                        overflow: "scroll",
                    }}>
                        <ScrollView
                            style={{
                                flex: 9
                            }}
                        >
                                <FlatList
                                    data={room.messages}
                                    renderItem={({ item }) => {
                                        const isMe = item.user === socket?.id;
                                        return (
                                            !isMe ? (
                                                <View>
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            color: '#fff',
                                                            backgroundColor: '#1e90ff',
                                                            marginTop: 5,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            borderColor: 'gray',
                                                            borderWidth: 1,
                                                            width: '80%',
                                                            padding: 8,
                                                            borderTopLeftRadius: 10,
                                                            borderBottomRightRadius: 10,
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Text>
                                                    <Text>
                                                        {item.time}
                                                    </Text>
                                                </View>
                                            ) : (
                                                <View
                                                    style={{
                                                        paddingLeft: '40%',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            color: '#fff',
                                                            backgroundColor: '#A6EFAB',
                                                            marginTop: 5,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            borderColor: 'gray',
                                                            borderWidth: 1,
                                                            width: '80%',
                                                            padding: 8,
                                                            borderTopLeftRadius: 10,
                                                            borderBottomRightRadius: 10,
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Text>
                                                    <Text>
                                                        {item.time}
                                                    </Text>
                                                </View>
                                            )
                                        );
                                    }}
                                    ListEmptyComponent={() => {
                                        return (
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: '#1e90ff',
                                                    marginTop: 50,
                                                }}>
                                                No Messages
                                            </Text>
                                        );
                                    }}
                                    keyExtractor={item => item.id}
                                />
                                </ScrollView>
                            </View>

                            {/* 

                        Chat Application Messages: END

                    */}
                        <View
                            style={{
                                overflow: 'hidden',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderColor: 'gray',
                                borderWidth: 1,
                            }}>
                            <TextInput
                                style={{
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    width: '70%',
                                    margin: 10,
                                }}
                                onChangeText={text => setMessage(text)}
                                value={message}
                                placeholder="Enter Message"
                            />
                            <Button
                                mode="contained"
                                icon="send"
                                onPress={() => {
                                    sendMessage();
                                }}>
                                Send
                            </Button>
                        </View>
                    </View>
                ) : (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => handleOpenChatMsg(item)}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            margin: '4%',
                                            borderColor: '#1e90ff',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            padding: '3%',
                                            backgroundColor: '#1e90ff',
                                        }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>
                                            {item.name.length > 15
                                                ? item.name.substring(0, 15) + '...'
                                                : item.name}{' '}
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    // Background Color
                                                    color: 'gray',
                                                    fontWeight: 'bold',
                                                    borderColor: '#1e90ff',
                                                    padding: 5,
                                                    borderWidth: 1,
                                                    // Font Color
                                                    color: '#ccc',
                                                }}>
                                                ({item.messages.length} Messages)
                                            </Text>
                                        </Text>
                                        <Icon
                                            name="chevron-right"
                                            style={{
                                                fontSize: 20,
                                                color: '#fff',
                                                marginLeft: '5%',
                                                marginRight: '5%',
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() => {
                            return (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '5%',
                                    }}>
                                    <Text style={{ fontSize: 15, color: 'red' }}>
                                        No Rooms Created or Available
                                    </Text>
                                </View>
                            );
                        }}
                    />
                )}
            </View>
            {enterRoom ? (
                ''
            ) : (
                <View
                    style={{
                        margin: '4%',
                    }}>
                    {!visible ? (
                        <Button mode="outlined" icon="group" onPress={handleCreateGroup}>
                            Create Room
                        </Button>
                    ) : (
                        ''
                    )}
                </View>
            )}
            {visible ? <CreateRoomModal setVisible={setVisible} socket={socket} /> : ''}
        </>
    );
};

export default ChatGroups;
