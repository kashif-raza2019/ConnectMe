import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/actions/loginActions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation} from '@react-navigation/native';


const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const obj = useSelector(state => state?.loginReducer)
    return (
        <View>
            <TouchableOpacity 
                style={styles.boxList}
            >
            <Text
                style={styles.text}
            > <Icon name="user-circle-o" style={styles.icon} /> {obj?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.boxList}
                onPress={() => {
                    navigation.navigate('Profile')
                }}
            >
            <Text
                style={styles.text}
            > <Icon name="gear" style={styles.icon} /> Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.boxListLogout}
                onPress={() => {
                    Alert.alert(
                        "Logout",
                        "Are you sure you want to logout?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => {
                                props.logout()
                            } }
                        ],
                    )
                }}
            >
            <Text
                style={styles.textLogout}
            > <Icon name="sign-out" style={styles.iconLogout} /> Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
// Map state to props
const mapStateToProps = (state) => {
    return {
        state: state.loginReducer
    }
}

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)

const styles = StyleSheet.create({
    boxList: {
        margin: 20,
        alignItems: 'center',
        padding: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e90ff'
    },
    icon: {
        fontSize: 25,
        color: '#1e90ff',
        marginRight: 30
    },
    boxListLogout: {
        margin: 20,
        marginTop: '90%',
        alignItems: 'center',
        padding: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    textLogout: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    iconLogout: {
        fontSize: 25,
        color: 'red',
        marginRight: 30
    },
})
