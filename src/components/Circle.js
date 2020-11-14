

import React from 'react';
import {
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


import { colors } from '../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    circleContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    iconContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function Circle(props) {

    const {
        onPress,
        index,
        circleAnimatedController,
        backgroundAnimatedController
    } = props

    const Arrow = Animated.createAnimatedComponent(Icon);

    const scale = circleAnimatedController.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 20, 1],
    })

    const rotateY = circleAnimatedController.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '-90deg', '-180deg'],
    })

    const opacity = circleAnimatedController.interpolate({
        inputRange: [0, 0.1, 0.9, 1],
        outputRange: [1, 0, 0, 1],
    })

    const circleBackgroundColor = backgroundAnimatedController.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [colors[0].circle, colors[1].circle, colors[2].circle]
    })
    const iconColor = backgroundAnimatedController.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [colors[0].icon, colors[1].icon, colors[2].icon]
    })


    return (
        <Animated.View style={styles.circleContainer}>
            <TouchableOpacity onPress={onPress}>
                <Animated.View style={[
                    styles.circle,
                    {
                        transform: [
                            { perspective: 200 },
                            { rotateY: rotateY },
                            { scale: scale },
                        ]
                    }
                ]} >
                    <Animated.View style={{ backgroundColor: circleBackgroundColor, borderRadius: 50 }}>
                        <Animated.View style={[
                            styles.iconContainer,
                            {
                                transform: [
                                    { perspective: 200 },
                                    { rotateY: rotateY },
                                ]
                            },
                            { opacity: opacity }
                        ]}>
                            <Arrow name={'angle-right'} size={25} style={{ color: iconColor }} />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>

            </TouchableOpacity>

        </Animated.View>
    )

}

