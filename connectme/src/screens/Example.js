import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import React, {useState} from 'react'

const Example = () => {
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    const validatePassword = (password) =>  {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

  return (
    <View>
      <Text>Example</Text>
      {/* 
            Text Input for react native paper with error handling 
      */}
        <TextInput
            label="Password"
            mode="outlined"
            style={{
                marginTop: 5,
                marginBottom: 5,
            }}
            onChangeText={text => {
                setPassword(text);
                setErrorPassword(!validatePassword(text));
            }}
            error={errorPassword}
        />
    </View>
  )
}

export default Example