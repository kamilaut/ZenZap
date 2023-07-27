import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore"; 

export default function Chat({ route, db, navigation }) {
  const { userName, backgroundColor, userID } = route.params;

  // State to manage messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages
  const onSend = async(newMessages) => {
   try {
    // saving sent msgs to the firestore
    await addDoc (collection(db, "messages"), {
      text: newMessages[0].text,
      createdAt: newMessages[0].createdAt,
      user: {
        _id: userID,
        name: userName,
      },
    })
    
    //updating messages state 
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  // useEffect to fetch messages from the database in real-time
  useEffect(() => {
    navigation.setOptions({ title: userName }); 
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [ userName ]);

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
          _id: userID,
          name: userName,
        }}
        renderBubble={renderBubble}
      />
      {/* KeyboardAvoidingView for Android to adjust keyboard */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

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
