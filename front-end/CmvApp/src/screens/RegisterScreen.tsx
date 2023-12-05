import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../services/api';

interface RegisterScreenProps {
    navigation: any; 
  }


const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      const response = await register(username, password);
      Alert.alert("Başarılı", "Kayıt başarılı, lütfen giriş yapın.");
    } catch (error) {
      Alert.alert("Hata", "Kayıt başarısız");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default RegisterScreen;
