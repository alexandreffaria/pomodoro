import React, { Component } from 'react';
import { Touchable, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Text, View, StyleSheet, Button } from 'react-native';

class CountdownTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.minutes * 60,
            isRunning: false,
        };
    }

    componentDidMount() {
        if (this.state.isRunning) {
            this.startTimer()
        }

    }

    componentWillUnmount() {
        this.stopTimer()
    }

    startTimer = () => {
        this.setState({ isRunning: true }, () => {
            this.timer = setInterval(() => {
                this.setState(prevState => ({
                    time: prevState.time - 1,
                }), () => {
                    if (this.state.time === 0) {
                        this.stopTimer();
                        this.props.onFinish();
                    }
                });
            }, 1000);
        });
    };

    stopTimer = () => {
        clearInterval(this.timer)
        this.setState({ isRunning: false })
    }

    resetTimer = (minutes) => {
        this.stopTimer()
        this.setState({
            time: minutes * 60,
            isRunning: false,
        })
    }

    incrementMinutes = () => {
        this.setState(prevState => ({
            time: prevState.time + 60,
        }))
    }

    decrementMinutes = () => {
        this.setState(prevState => ({
            time: Math.max(0, prevState.time - 60),
        }))
    }

    render() {
        const { time, isRunning } = this.state;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return (
            <View >
                <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <TouchableNativeFeedback
                        onPress={this.decrementMinutes}
                        disabled={isRunning}
                        accessibilityLabel="Decrease minutes"
                        accessibilityState={{ disabled: isRunning }}
                    >
                        <Text
                            style={styles.bigGray}

                        >
                            -
                        </Text>
                    </TouchableNativeFeedback>
                    <Text
                        style={styles.bigGray}
                    >
                        {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                    </Text>
                    <TouchableNativeFeedback
                        onPress={this.incrementMinutes}
                        disabled={isRunning}
                        accessibilityLabel="Increase minutes"
                        accessibilityState={{ disabled: isRunning }}
                    >
                        <Text
                            style={styles.bigGray}

                        >
                            +
                        </Text>
                    </TouchableNativeFeedback>
                </View>
                <View
                    style={{ alignItems: 'center' }}
                >
                    <TouchableNativeFeedback

                        onPress={isRunning ? this.stopTimer : this.startTimer}
                        disabled={isRunning ? this.stopTimer : this.startTimer}
                        accessibilityLabel={isRunning ? 'Stop timer' : 'Start timer'}
                        accessibilityState={{ disabled: isRunning }}
                    >
                        <Text
                            style={styles.bigGray}
                        >
                            {isRunning ? 'Stop' : 'Start'}
                        </Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => this.resetTimer(this.props.minutes)}
                        disabled={isRunning}
                        accessibilityLabel="Reset timer"
                        accessibilityState={{ disabled: isRunning }}
                    >
                        <Text
                            style={styles.bigGray}

                        >
                            Reset
                        </Text>
                    </TouchableNativeFeedback>

                </View>


            </View>

        );
    }
}

export default CountdownTimer;


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
        padding: 10,
    },
    button: {
        titleStyle: '100'
    }
});
