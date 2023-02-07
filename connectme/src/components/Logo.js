import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

const Logo = () => {
  return (
    <View
        style={styles?.centeredContainer}
    >
        <Text
            style={styles?.logoText}
        >Connect Me! <Icon name="rocket" style={styles?.logo} /></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        backgroundColor: '#1e90ff'
    },
    logo: {
        fontSize: 60,
        color: 'white'
    },
    logoText: {
        fontSize: 40,
        fontWeight: '600',
        fontFamily: 'Helvetica',
    }
})


export default Logo