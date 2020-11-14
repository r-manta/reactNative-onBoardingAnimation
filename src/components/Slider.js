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
        alignItems: 'center',
        flex: 1,
    },
});

export default function Slider(props) {

    const {
        index,
        textColor,
        silderAnimatedController,
    } = props

    const translateX = silderAnimatedController.interpolate({
        inputRange: [...Array(JSON.length).keys()],
        outputRange: JSON.map((_, i) => -i * width)
    })


    return (
        <Animated.View style={[
            styles.sliderContainer,
            { position: 'relative' },
            { transform: [{ translateX: translateX }] }
        ]}>

            {JSON.map(({ img, title, label, }, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'column', width: width }}>
                        <View style={{ flexShrink: 1 }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={img}
                                resize={'cover'}
                            />
                        </View>
                        <View style={{ padding: 20, textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Animated.Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: textColor }}>{title}</Animated.Text>
                            <Animated.Text style={{ fontSize: 16, color: textColor }}>{label}</Animated.Text>
                        </View>

                    </View>
                )
            })}
        </Animated.View>
    )
}
