import { View, Text } from 'react-native'
import React from 'react'
import {connect} from 'react-redux'
import LoginScreen from './LoginScreen'
import StackNavigator from '../navigation/stack/StackNavigator'


const RouteScreen = ({state}) => {
    // const [isLogin, setIsLogin] = state.isL

    console.log(state)


    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {state.isLoggedIn ? <StackNavigator /> : <LoginScreen />}
        </View> 
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.loginReducer
    }
}

export default connect(mapStateToProps)(RouteScreen)