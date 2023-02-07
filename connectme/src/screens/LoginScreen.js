import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions/loginActions'
import HeaderLogo from '../components/HeaderLogo'
import Footer from '../components/Footer'

const LoginScreen = ({ state, login }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorPassword, setErrorPasswprd] = useState('');

    const validatePassword = (password) =>  {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    return (
        <View>
            <HeaderLogo />
            <View
                style={styles.loginFormContainer}
            >
                <TextInput
                    label="Full name"
                    mode="outlined"
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    onChangeText={text => setFullName(text)}
                />
                <TextInput
                    label="Username"
                    mode="outlined"
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    onChangeText={text => setPassword(text)}
                
                />
                <Text
                    style={{
                        color: 'red',
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 12,
                    }}
                >
                    {errorPassword}
                </Text>
                <Button icon="earth" mode="outlined" 
                    onPress={() => { 
                        if(!validatePassword(password)) {
                            setErrorPasswprd('Password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character')
                            return;
                        }else{
                            setErrorPasswprd('')
                            login({name: fullName, username: username, password: password, userid:1})
                        }
                    }}
                    style={{
                        marginTop: 10,
                        marginBottom: 5,
                    }}
                >
                    Connect Me
                </Button>
            </View>
            <Footer />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: ({name, username, password, userid}) => dispatch(login(name, username, password, userid))
    }
}

const styles = StyleSheet.create({
    loginFormContainer: {
        padding: '20%',
        backgroundColor: '#fff',
    },
    loginForm: {
        width: '80%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loginFormButton: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)