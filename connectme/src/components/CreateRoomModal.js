import { View, Text, Alert } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addSocketRoomAction } from '../redux/actions/roomsAction'

const CreateRoomModal = ({ setVisible, state, addSocketRoom , socket}) => {

    const closeModal = () => setVisible(false);
	const [groupName, setGroupName] = useState("");

	const handleCreateRoom = () => {
        if(groupName === "" || groupName === null || groupName === undefined) {
            Alert.alert("Please enter a group name", "Group name cannot be empty");
            return;
        }else{
            socket.emit("createRoom", groupName);
            socket.on("roomCreated", (room) => {
                addSocketRoom(room);
            });
        }
		closeModal();
	};

    return (
        <View
            style={{
                margin: '10%',
                backgroundColor: 'white',
                padding: 10,
            }}
        >
                <View 
                    style={{
                        width: "100%",
                        border: 1,
                        borderColor: "black",
                    }}
                >
                    <Text 
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: '1%',
                            marginBottom: '1%'
                        }}
                    >Create Room</Text>
                    <View >
                        <TextInput
                            mode='outlined'
                            label="Room Name"
                            value={groupName}
                            onChangeText={(text) => setGroupName(text)}
                            style={{
                                margin: '5%',
                                padding: 5,
                            }}
                        />
                        <View>
                            <Button
                                icon="close"
                                mode="outlined"
                                title="Cancel"
                                onPress={closeModal}

                            >
                                Cancel
                            </Button>
                            <Button
                                icon="check"
                                mode="outlined"
                                title="Create"
                                onPress={handleCreateRoom}
                            >
                                Create Room
                            </Button>
                        </View>
                    </View>
                </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        rooms: state.roomsReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSocketRoom: (room) => dispatch(addSocketRoomAction(room)),
    };
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRoomModal);