import React, { useEffect } from "react";
import { Alert, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";


LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
const Stack = createNativeStackNavigator();

const App = () => { 
  const connectionStatus = useNetInfo();
  
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
const storage = getStorage(app);


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
          title: route.params?.userName ?? "Chat",
          headerStyle: {
            backgroundColor: route.params?.backgroundColor ?? "#757083",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        {(props) => <Chat 
        isConnected={connectionStatus.isConnected} 
        db={db} 
        storage={storage}
        {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default App;
