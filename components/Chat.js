import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Chat({ route }) {
  const { userName, backgroundColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.chatText}>Welcome to the chat screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chatText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
  },
});

