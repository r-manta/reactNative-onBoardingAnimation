

import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { colors, JSON } from './src/utils'
import Slider from './src/components/Slider'
import Circle from './src/components/Circle'

const DURATION = 1000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default function App() {

  const [nextSlider, setNextSlider] = useState(0)
  const [direction, setDirection] = useState('forward')
  const circleAnimatedController = useRef(new Animated.Value(0)).current
  const silderAnimatedController = useRef(new Animated.Value(0)).current
  const backgroundAnimatedController = useRef(new Animated.Value(0)).current


  const backgroundColor = backgroundAnimatedController.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors[0].background, colors[1].background, colors[2].background,]
  })

  const onPress = () => {

    let index;
    circleAnimatedController.setValue(0)
    console.log(nextSlider)

    if (nextSlider >= JSON.length - 1 || direction === 'backward') {
      setDirection('backward')
      index = nextSlider - 1
      if (nextSlider === 1) setDirection('forward')
    } else {
      setDirection('forward')
      index = nextSlider + 1
    }
    setNextSlider(index)

    Animated.parallel([
      Animated.timing(circleAnimatedController, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(silderAnimatedController, {
        toValue: index,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnimatedController, {
        toValue: index,
        duration: DURATION,
        //useNativeDriver: false
      })
    ]).start()
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]} >
      <Slider
        direction={direction}
        silderAnimatedController={silderAnimatedController}
        backgroundAnimatedController={backgroundAnimatedController}
      />
      <Circle
        onPress={onPress}
        index={nextSlider}
        direction={direction}
        backgroundAnimatedController={backgroundAnimatedController}
        circleAnimatedController={circleAnimatedController}
      />
    </Animated.View>
  );
}

