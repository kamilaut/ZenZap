import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Start({ navigation }) {
  const [userName, setUserName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#090C08');

  const handleStartChatting = () => {
    navigation.navigate('Chat', { userName, backgroundColor });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>App Name</Text>
      <View style={styles.contentContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.subtitle}>Your Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setUserName(text)}
            value={userName}
            placeholder="Enter your name"
          />
        </View>
        <Text style={styles.subtitle}>Choose background color</Text>
        <View style={styles.colorOptionsContainer}>
          <TouchableOpacity
            style={[styles.colorOption, { backgroundColor: '#090C08' }]}
            onPress={() => setBackgroundColor('#090C08')}
          />
          <TouchableOpacity
            style={[styles.colorOption, { backgroundColor: '#474056' }]}
            onPress={() => setBackgroundColor('#474056')}
          />
          <TouchableOpacity
            style={[styles.colorOption, { backgroundColor: '#8A95A5' }]}
            onPress={() => setBackgroundColor('#8A95A5')}
          />
          <TouchableOpacity
            style={[styles.colorOption, { backgroundColor: '#B9C6AE' }]}
            onPress={() => setBackgroundColor('#B9C6AE')}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleStartChatting}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: '10%',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingHorizontal: '6%',
    paddingVertical: '6%',
    borderRadius: 10,
    width: '88%',
    marginTop: '10%',
    alignItems: 'center',
  },
  nameContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#757083',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '6%',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
