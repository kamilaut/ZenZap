import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

export default function App() {
  return (
    <ImageBackground source={require('./assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>ZenZap</Text>
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Image source={require('./assets/images/icon.png')} style={styles.icon} />
            <Text style={styles.subtitle}>Your Name</Text>
          </View>
          <Text style={styles.subtitle}>Choose background color</Text>
          <View style={styles.colorOptionsContainer}>
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#090C08' }]} />
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#474056' }]} />
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#8A95A5' }]} />
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#B9C6AE' }]} />
          </View>
          <TouchableOpacity style={styles.button}>
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
    width: '88%',
    marginTop: '10%',
    alignItems: 'center',
  },
  nameContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '6%',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 40,
    
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});