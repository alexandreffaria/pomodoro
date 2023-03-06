import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CountdownTimer from './CountDownTimer';
import { Vibration } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isPomodoro: false
    }
  }


  pomodoroEnd = () => {
    console.log("ended")
    Vibration.vibrate([1000, 1000])
    this.setState(prevState => ({
      isPomodoro: !prevState.isPomodoro
    }))

    this.countdownTimer.resetTimer(5);
    this.countdownTimer.startTimer();
  }

  render() {

    const { isPomodoro } = this.state
    const minutes = isPomodoro ? 25 : 5

    return (
      <View
        style={styles.container}
      >
        <Text
          style={styles.bigGray}
        >
          🍅
        </Text>
        <CountdownTimer
          ref={component => this.countdownTimer = component}
          minutes={25}
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
