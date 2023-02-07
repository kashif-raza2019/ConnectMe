import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Footer = () => {
    return (
        <View
            style={styles.footer}
        >
            <Text
                style={styles.footerText}
            >
                © 2023 Connect Me! All rights reserved.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    footerText: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 10,
        marginTop: '5%',
        marginBottom: '5%',
    },
})


export default Footer