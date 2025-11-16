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
        toValue: 0.9,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!isHinted) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
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
            borderRadius: 12,
            borderWidth: isHinted ? 3 : 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cell.matched 
              ? '#D1D5DB' 
              : isHinted
              ? '#DBEAFE'
              : selected 
              ? '#FDE047' 
              : invalidMatch 
              ? '#FEE2E2' 
              : '#FFFFFF',
            borderColor: cell.matched 
              ? '#9CA3AF' 
              : isHinted
              ? '#3B82F6'
              : selected 
              ? '#EAB308' 
              : invalidMatch 
              ? '#F87171' 
              : '#D1D5DB',
            shadowColor: isHinted ? '#3B82F6' : undefined,
            shadowOffset: isHinted ? { width: 0, height: 0 } : undefined,
            shadowOpacity: isHinted ? 0.8 : undefined,
            shadowRadius: isHinted ? 8 : undefined,
            elevation: isHinted ? 8 : 0,
          }}
        >
          <Text 
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: cell.matched 
                ? '#6B7280' 
                : selected 
                ? '#713F12' 
                : '#111827',
            }}
          >
            {cell.value}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

