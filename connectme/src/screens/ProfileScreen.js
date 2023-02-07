import { View, Text, StyleSheet } from 'react-native'
import {Card} from 'react-native-paper'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    const obj = useSelector(state => state?.loginReducer)
    const [passwordHidden, setPasswordHidden] = useState(true)
    return (
        <View>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 30,
                }}
            >
                Your Profile
            </Text>
            <Text style={{
                textAlign: 'center',
            }}>
                <Icon name="user-circle-o" style={styles.icon} />
            </Text>
            <Card style={{margin: 20, padding: 30}}>
                <Card.Title title="Details" />
                <Card.Content>
                    <Text style={styles.text}>
                        Name: {obj?.name}
                    </Text>
                    <Text style={styles.text}>
                        Username: {obj?.username}
                    </Text>

                    <Text style={styles.text}>
                        Password: {
                            passwordHidden ? '********' : obj?.password
                        }
                        {' '}
                        <Icon name={passwordHidden ? 'eye-slash' : 'eye'} style={styles.iconSmall} onPress={() => setPasswordHidden(!passwordHidden)} />
                    </Text>
                </Card.Content>
            </Card>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginTop: 20
    },
    icon: {
        fontSize: 80,
        marginTop: 20
    },
    iconSmall:{
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 10,
        color: 'blue',
        marginRight: 10,
        paddingHorizontal: 10
    }

});

export default ProfileScreen