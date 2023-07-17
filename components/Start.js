import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';

export default function Start({ navigation }) {
  const [userName, setUserName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#090C08'); // Add selectedColor state

  const handleStartChatting = () => {
    navigation.navigate('Chat', {
      userName,
      backgroundColor: selectedColor,
    });
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>ZenZap</Text>
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setUserName}
              value={userName}
              placeholder="Your Name"
              placeholderTextColor="#757083"
            />
          </View>
          <Text style={styles.subtitle}>Choose background color</Text>
          <View style={styles.colorOptionsContainer}>
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#090C08' }]}
              onPress={() => handleColorSelection('#090C08')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#474056' }]}
              onPress={() => handleColorSelection('#474056')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#8A95A5' }]}
              onPress={() => handleColorSelection('#8A95A5')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#B9C6AE' }]}
              onPress={() => handleColorSelection('#B9C6AE')}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleStartChatting}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 120,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingHorizontal: '6%',
    paddingVertical: '6%',
    width: '88%',
    marginTop: '10%',
    alignItems: 'flex-start',
    minHeight: "44%",
    margin: 50,
    justifyContent: 'space-between'
  },
  nameContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: 'grey',
    borderWidth: 2
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginLeft: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#757083',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginTop: 40
    
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '6%',
    width: '90%',
    paddingVertical: 5
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignSelf: "stretch",
    button: '75',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

