import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class CountDownTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.minutes * 60,
        };
    }

    tick = () => {
        this.setState(prevState => {
            const time = prevState.time - 1;
            if (time === 0) {
                clearInterval(this.timer);
                this.props.onFinish();
            }
            return { time };
        });
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { time } = this.state;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return (
            <View>
                <Text style={styles.bigGray}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
            </View>
        );
    }
}

export default CountDownTimer;


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
