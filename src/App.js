import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={{ color: 'white' }}>Funcionas branco?</Text>
      <Pressable
        onPress={() => alert('Ola')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'red' : 'blue',
          fontSize: pressed ? 32 : 16,
          padding: 10,
          borderRadius: 5,
        })}
      >
        <Text style={{ color: 'white' }}>Pulsa aquí</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
