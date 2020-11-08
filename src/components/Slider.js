import React from 'react';
import {
    Image,
    Dimensions,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { JSON } from '../utils'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default function Slider(props) {

    const {
        index,
        direction,
        silderAnimatedController,
    } = props

    const translateX = silderAnimatedController.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [width, -1, -width]
    })


    return (
        <Animated.View style={[
            styles.sliderContainer,
            { transform: [{ translateX: translateX }] }
        ]}>

            {JSON.map(({ img, label }, index) => {
                return (
                    <View key={index}
                        style={{ flexDirection: 'column', alignItems: 'center', }}
                    >
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 14
                            }}
                            source={{ uri: img }}
                            resize={'cover'}
                        />
                        <Text style={{ padding: 20, textAlign: 'center', fontSize: 16 }}>{label}</Text>

                    </View>
                )
            })}
        </Animated.View>
    )
}
