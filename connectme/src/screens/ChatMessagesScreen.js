import { View, Text, Alert ,FlatList} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import React, {useEffect, useState} from 'react'
import HeaderLogoGeneral from '../components/HeaderLogoGeneral';
import {socket} from '../socket-service/socket'
import { useSelector } from 'react-redux';

console.log(socket)


const ChatMessageScreen = ({...props}) => {

    const roomData = props?.route?.params?.room;

    console.log("Chat Messages Screen", props?.route)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket?.on('newMessage', (data) => {
            console.log("New Message", data)
            setMessages([...messages, data])
        })
    }, [socket]);

    const sendMessage = () => {
        if(message === '' || message === null || message === undefined) {
            Alert.alert('Please enter a message')
            return;
        }else{
            const room_id = roomData?.id;
            const user_id = "1";
            const hour =  new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;

            const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;
            const timestamp = {hour, mins};
            const data = {room_id: room_id, message, user: user_id, timestamp: timestamp}
            console.log("Data", data)
            // console.log("Send Message", message + ' ' + room_id + ' ' + user_id + ' ' + hour + ' ' + mins)

            socket.emit("newMessage", (data))
        }
        setMessage('')
    }

    const deleteRoom = () =>{
        console.log("Delete Room")
        socket?.emit('deleteRoom', {room: props?.route?.params?.room})
    }


    return (
        <View>
            <HeaderLogoGeneral />
            <View
                style={{
                    padding: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 0,
                    borderColor: 'purple',
                    borderWidth: 1,
                }}
            >
                <Text
                    style={{textAlign: 'center', fontSize: 20, color: '#1e90ff', fontWeight: 'bold', marginTop: '1%', marginBottom: '1%'}}
                >{props?.route?.params?.room?.name}</Text>
                <Button
                    mode="outlined"
                    icon="delete"
                    onPress={() => deleteRoom()}
                    style={{
                        color: '#1e90ff',
                    }}
                > Room
                </Button>
            </View>
            <FlatList
                data={messages}
                renderItem={({item}) => ( (
                        <View
                            style={{
                                padding: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                borderRadius: 0,
                                borderColor: 'purple',
                                borderWidth: 1,
                            }}
                        >
                            <Text
                                style={{textAlign: 'center', fontSize: 20, color: '#1e90ff', fontWeight: 'bold', marginTop: '1%', marginBottom: '1%'}}
                            >{item.user}</Text>
                            <Text
                                style={{textAlign: 'center', fontSize: 20, color: '#1e90ff', fontWeight: 'bold', marginTop: '1%', marginBottom: '1%'}}
                            >{item.message}</Text>
                            <Text
                                style={{textAlign: 'center', fontSize: 20, color: '#1e90ff', fontWeight: 'bold', marginTop: '1%', marginBottom: '1%'}}
                            >{item.timestamp.hour}:{item.timestamp.mins}</Text>
                        </View>
                    )
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{textAlign: 'center', fontSize: 15, color: '#ccc', marginTop: '1%', marginBottom: '1%'}}
                        >No Messages Yet</Text>
                    </View>
                )}
            />

            <View
            // Fix at bottom of screen no position absolute and without row 
                style={{
                    position: 'absolute',
                    bottom: -500,
                    left: '0%',
                    width: '100%',
                    padding: '0%',
                }}
            >
                <TextInput
                    label="Message"
                    value={message}
                    onChangeText={text => setMessage(text)}
                    autoCompleteType="off"
                    style={{
                        width: '100%',
                        marginBottom: '5%',
                    }}
                />
                <Button
                    mode="outlined"
                    icon="send"
                    onPress={sendMessage}
                >
                    Send
                </Button>
            </View>
            {/* 
                Connect Me! Chat Messages
            */}
        </View>
    );
};

export default ChatMessageScreen