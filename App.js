import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";


const Stack = createNativeStackNavigator();
const connectionStatus = useNetInfo();


const App = () => { 
  const firebaseConfig = {
  apiKey: "AIzaSyB2ho8ZxntFih_WLFKCbWcLh8hXhQba9zQ",
  authDomain: "zen-zapp.firebaseapp.com",
  projectId: "zen-zapp",
  storageBucket: "zen-zapp.appspot.com",
  messagingSenderId: "189202496542",
  appId: "1:189202496542:web:7430e03b93811f9245820f",
  measurementId: "G-XFNCCEQ8LM"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("No connection");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);

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
        options={({ route }) => ({
          title: route.params?.userName ?? 'Chat',
          headerStyle: {
            backgroundColor: route.params?.backgroundColor ?? '#757083',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
        >
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default App;
