

import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { colors, JSON } from './src/utils'
import Slider from './src/components/Slider'
import Circle from './src/components/Circle'

const DURATION = 800;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default function App() {

  const [nextSlider, setNextSlider] = useState(0)
  const [isFinalScreen, setFinalScreen] = useState(false)
  const circleAnimatedController = useRef(new Animated.Value(0)).current
  const silderAnimatedController = useRef(new Animated.Value(0)).current
  const backgroundAnimatedController = useRef(new Animated.Value(0)).current
  const buttonAnimatedController = useRef(new Animated.Value(0)).current

  const backgroundColor = backgroundAnimatedController.interpolate({
    inputRange: [...Array(JSON.length).keys()],
    outputRange: colors.map(color => color.background)
  })

  const textColor = backgroundAnimatedController.interpolate({
    inputRange: [...Array(JSON.length).keys()],
    outputRange: colors.map(color => color.textColor)
  })

  const opacity = buttonAnimatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const forward = () => {

    let index = nextSlider + 1
    circleAnimatedController.setValue(0)
    buttonAnimatedController.setValue(0)
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
      })
    ]).start(() => {
      if (nextSlider === JSON.length - 2) {
        setFinalScreen(true)
        Animated.timing(buttonAnimatedController, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true
        }).start()
      }
    })
  }

  const reset = () => {
    setNextSlider(0)

    Animated.timing(buttonAnimatedController, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setFinalScreen(false)
      circleAnimatedController.setValue(0)
      silderAnimatedController.setValue(0)
      backgroundAnimatedController.setValue(0)
    })

  }

  return (

    <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]} >
      <Slider
        textColor={textColor}
        silderAnimatedController={silderAnimatedController}
        backgroundAnimatedController={backgroundAnimatedController}
      />

      {!isFinalScreen ? (
        <Circle
          onPress={forward}
          index={nextSlider}
          backgroundAnimatedController={backgroundAnimatedController}
          circleAnimatedController={circleAnimatedController}
        />
      ) : (
          <Animated.View
            style={{
              opacity: opacity,
              height: 80,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={reset}
              style={{ backgroundColor: '#1a3b86', width: '70%', padding: 20, borderRadius: 14, }}>
              <Text style={{ fontSize: 16, color: '#F4F4F7', textAlign: 'center' }}>{"Start again"}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

    </Animated.View>



  );
}

