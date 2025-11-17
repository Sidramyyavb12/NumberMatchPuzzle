import { Animated } from 'react-native';

/**
 * Create shake animation for invalid matches
 */
export function createShakeAnimation(animatedValue: Animated.Value) {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Create fade animation for matched cells
 */
export function createFadeAnimation(animatedValue: Animated.Value) {
  return Animated.timing(animatedValue, {
    toValue: 0.4,
    duration: 300,
    useNativeDriver: true,
  });
}

/**
 * Create scale animation for cell press
 */
export function createScaleAnimation(animatedValue: Animated.Value, scale: number = 0.95) {
  return Animated.spring(animatedValue, {
    toValue: scale,
    useNativeDriver: true,
    tension: 300,
    friction: 10,
  });
}

/**
 * Create pulsing animation for hint cells (more playful cartoon style)
 */
export function createPulseAnimation(animatedValue: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 1.15,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
    ])
  );
}

