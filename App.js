import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import CountDownTimer from './CountDownTimer';
import { Vibration } from 'react-native';


class Count extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      showCounter: this.props.showCounter,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.inc, 1000)
  }
  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  shouldComponentUpdate(nextProps) {

    return true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showCounter !== this.props.showCounter) {
      this.setState({ showCounter: this.props.showCounter })
    }
  }

  pomodoroEnd() {
    console.log("ended")
    Vibration.vibrate([1000, 1000])

  }

  render() {
    return (
      <View>
        <Text style={styles.count}>🍅</Text>
        <CountDownTimer
          minutes={25}
          onFinish={this.pomodoroEnd}
        />
      </View>
    )
  }
}


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      showCounter: true,
    }
  }

  toggleCounter = () => {
    this.setState(prevState => ({
      showCounter: !prevState.showCounter
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showCounter ? (
          <Count
            count={this.state.count}
          />
        ) : (
          <View />
        )}

        <Button title='Toggle' onPress={this.toggleCounter} />
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
  count: {
    fontSize: 100,
    color: '#6c6c6c',
  }
});
