import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../../screens/HomeScreen'
import { connect } from 'react-redux'

import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator();


const DrawerNavigator = (props) => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => {
                return <CustomDrawerContent />
                }
            }
        >
            <Drawer.Screen 
                name="Home" 
                component={HomeScreen}
            />
        </Drawer.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.loginReducer
    }
}



export default connect(mapStateToProps)(DrawerNavigator)


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