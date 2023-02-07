import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../../screens/ProfileScreen'
import {socket} from '../../socket-service/socket'
import DrawerNavigator from '../drawer/DrawerNavigator'
import Example from '../../screens/Example'

const Stack = createNativeStackNavigator();

const StackNavigator = ({...props}) => {
  console.log('in stack navigation');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Dashboard" options={{headerShown: false}} component={DrawerNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="Chat" component={ChatMessageScreen} 
            options={
              ({ 
                route 
              }) => (
                { 
                  title: route.params.room.n ame ,
                })
            }

            
        />  */}
        <Stack.Screen name="Example" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator