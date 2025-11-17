import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View, Animated } from 'react-native';
import { Cell as CellType } from '../types/game.types';
import { GAME_CONFIG } from '../constants/levels';
import { createShakeAnimation, createFadeAnimation, createPulseAnimation } from '../utils/animations';

interface CellProps {
  cell: CellType;
  selected: boolean;
  onPress: (cell: CellType) => void;
  invalidMatch?: boolean;
  isHinted?: boolean;
}

export default function Cell({ cell, selected, onPress, invalidMatch = false, isHinted = false }: CellProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (cell.matched) {
      createFadeAnimation(fadeAnim).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [cell.matched, fadeAnim]);

  useEffect(() => {
    if (invalidMatch) {
      createShakeAnimation(shakeAnim).start(() => {
        shakeAnim.setValue(0);
      });
    }
  }, [invalidMatch, shakeAnim]);

  useEffect(() => {
    if (isHinted) {
      const pulse = createPulseAnimation(pulseAnim);
      pulse.start();
      return () => {
        pulse.stop();
        pulseAnim.setValue(1);
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [isHinted, pulseAnim]);

  const handlePressIn = () => {
    if (!isHinted) {
      Animated.spring(scaleAnim, {
        toValue: 0.85,
        useNativeDriver: true,
        tension: 200,
        friction: 5,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isHinted) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 5,
      }).start();
    }
  };

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: shakeAnim },
          { scale: isHinted ? pulseAnim : scaleAnim },
        ],
        opacity: fadeAnim,
      }}
    >
      <Pressable
        onPress={() => onPress(cell)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={cell.matched}
        style={{
          width: GAME_CONFIG.CELL_SIZE,
          height: GAME_CONFIG.CELL_SIZE,
          margin: 4,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: isHinted ? 4 : 3,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cell.matched 
              ? '#C8E6C9' 
              : isHinted
              ? '#A5D6A7'
              : selected 
              ? '#FFD54F' 
              : invalidMatch 
              ? '#FFCDD2' 
              : '#FFFFFF',
            borderColor: cell.matched 
              ? '#81C784' 
              : isHinted
              ? '#4CAF50'
              : selected 
              ? '#FFC107' 
              : invalidMatch 
              ? '#F44336' 
              : '#66BB6A',
            shadowColor: isHinted ? '#4CAF50' : selected ? '#FFC107' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isHinted ? 0.6 : selected ? 0.3 : 0.2,
            shadowRadius: isHinted ? 12 : 6,
            elevation: isHinted ? 8 : selected ? 4 : 2,
          }}
        >
          <Text 
            style={{
              fontSize: 28,
              fontWeight: '900',
              color: cell.matched 
                ? '#66BB6A' 
                : selected 
                ? '#F57C00' 
                : isHinted
                ? '#1B5E20'
                : '#2E7D32',
            }}
          >
            {cell.value}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

