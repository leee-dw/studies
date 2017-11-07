import React from 'react';
import { StyleSheet, Text, View, Image, ActivytyIndicator } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivytyIndicator />
        <Text>Hello! I'm a Native Developer Now! And I hate React</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
