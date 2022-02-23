import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SGPA Calculator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b5c62',
    width:"auto",
    height:"auto",
    padding:30
  },
  text:{
    color:"white",
    fontSize:30,
    textAlign:"center",
    fontFamily: 'monospace',
    fontWeight: 'bold',
  }
});
