import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { storage } from "firebase/storage";

const Chat = ({ isConnected, route, db, navigation }) => {
  const { userName, backgroundColor, userID } = route.params;
  // State to manage messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
    
  // Function to cache messages using AsyncStorage
  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem("chat", JSON.stringify(messages));
    } catch (error) {
      console.log("Error caching messages:", error);
    }
  };
  
  // Load messages from async storage when there's no connection 
  const loadCachedChat = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("chat");
      if (cachedMessages !== null) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.log("Error loading cached messages:", error);
    }
  };

  // useEffect to fetch messages from the database in real-time
  useEffect(() => {
    navigation.setOptions({ title: userName }); 
    let unsubMessages;
    
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
      
    } else {
      loadCachedChat();
    }
  
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [ isConnected ]);
  
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else 
    return null;
  }
  
  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  // Function to customize the appearance of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2C3E39',
          },
          left: {
            backgroundColor: '#B5E6A3',
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',  
          },
          left: {
            color: '#000000',  
          },
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

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
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />
      {/* KeyboardAvoidingView for Android to adjust keyboard */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Chat;
