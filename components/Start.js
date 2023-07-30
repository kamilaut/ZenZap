// start.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2C3E39'); // Updated with RGB value

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          userName: userName,
          backgroundColor: selectedColor
         });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  }

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
              style={[styles.colorOption, { backgroundColor: '#7096A1' }]}
              onPress={() => handleColorSelection('#7096A1')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#B2C9CE' }]}
              onPress={() => handleColorSelection('#B2C9CE')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#DDD8CA' }]}
              onPress={() => handleColorSelection('#DDD8CA')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#E2F2DC' }]}
              onPress={() => handleColorSelection('#E2F2DC')}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => signInUser()}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: '10%',
    paddingVertical: '8%',
    width: '90%',
    alignItems: 'center',
    borderRadius: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#757083',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757083',
    marginBottom: 20,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 40,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Start;
