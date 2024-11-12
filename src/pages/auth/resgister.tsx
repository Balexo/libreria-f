import { useState } from 'react';
import { TextInput, View, Button } from 'react-native';
import { registerUser } from './AuthService';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      console.log('Usuario registrado');
    } catch (error) {
      setError('Usuario al registrar usuario');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
