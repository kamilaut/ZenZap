import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Chat({ route }) {
  const { userName, backgroundColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.userName}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
