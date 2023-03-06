import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import CountDownTimer from './CountDownTimer';
import { Vibration } from 'react-native';

export default class App extends React.Component {

  pomodoroEnd() {
    console.log("ended")
    Vibration.vibrate([1000, 1000])
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigGray}>🍅</Text>
        <CountDownTimer
          minutes={.05}
          onFinish={this.pomodoroEnd}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigGray: {
    fontSize: 100,
    color: '#6c6c6c',
  }
});
