import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const HeaderLogoGeneral = () => {
    return (
        <View
            style={styles.loginForm}
        >
            <Text
                style={styles.centeredText}
            >Connect Me! <Icon name="rocket" style={styles.logoSmall} /></Text>
        </View>
    )
}


const styles = StyleSheet.create({
    loginForm: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    centeredText: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: '1%',
    },
    logoSmall:{
        fontSize: 40,
        color : '#1e90ff'
    }
})



export default HeaderLogoGeneral