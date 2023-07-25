import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Message } from 'react-native-gifted-chat';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyB2ho8ZxntFih_WLFKCbWcLh8hXhQba9zQ",
  authDomain: "zen-zapp.firebaseapp.com",
  projectId: "zen-zapp",
  storageBucket: "zen-zapp.appspot.com",
  messagingSenderId: "189202496542",
  appId: "1:189202496542:web:7430e03b93811f9245820f",
  measurementId: "G-XFNCCEQ8LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            title: route.params?.userName ?? 'Chat',
            headerStyle: {
              backgroundColor: route.params?.backgroundColor ?? '#757083',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        />
        {props => <Chat db={db} {...props} />}
      </Stack.Navigator>
    </NavigationContainer>
  );

  export default App;
