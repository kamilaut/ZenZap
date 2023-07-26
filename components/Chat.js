import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default function Chat({ route }) {
  const { userName, backgroundColor } = route.params;

  // State to manage messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  // useEffect to add initial static messages (system message and user message)
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'You think you ate?',
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Today is a perfect day to remember all the exes who are living much happier lives without you',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'User',
        },
      },
    ]);
  }, []);

  // Function to customize the appearance of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  // Function to handle actions when "More Options" button is pressed
  const onPress = () => {
    // You can add more actions here if needed
    console.log('More options pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.userName}>{userName}</Text>
      {/* GiftedChat component to display messages */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // You can use any unique ID here to identify the user
          name: userName,
        }}
        renderBubble={renderBubble}
      />
      {/* KeyboardAvoidingView for Android to adjust keyboard */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="padding" /> : null}

      {/* "More Options" button */}
      <TouchableOpacity>
        <Text>More Options</Text>
      </TouchableOpacity>
    </View>
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
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
})
