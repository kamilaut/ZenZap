import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function Chat({ route }) {
  const { userName, backgroundColor } = route.params;

  // Seting up state to manage messages
  const [messages, setMessages] = useState([]);

  // Adding two static messages (system message and user message) using useEffect
  useEffect(() => {
    // System message to indicate the user has entered the chat
    const systemMessage = {
      _id: 1,
      text: 'Welcome to the chat!',
      createdAt: new Date(),
      system: true,
    };

    // User message (you can customize this)
    const userMessage = {
      _id: 2,
      text: 'Hello, how are you?',
      createdAt: new Date(),
      user: {
        _id: 3,
        name: 'User',
      },
    };

    // Combining the static messages and set them to the state
    setMessages([systemMessage, userMessage]);
  }, []);

  // Implementing the GiftedChat component to display messages
  return (
    //Adding KeyboardAvoidingView for Android and iOS
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust as needed
    >
      <Text style={styles.userName}>{userName}</Text>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages))}
        user={{
          _id: 3, // You can use any unique ID here to identify the user
          name: userName,
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
