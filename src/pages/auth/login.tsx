import { useState } from 'react';
import { TextInput, View, Button } from 'react-native';
import { signupUser } from './AuthService';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await signupUser(email, password);
    } catch (error) {
      setError('Error al registrarse el usuario');
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
      <Button title="Iniciar sesión" onPress={handleSignup} />
    </View>
  );
}
