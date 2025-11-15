import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View, Animated } from 'react-native';
import { Cell as CellType } from '../types/game.types';
import { GAME_CONFIG } from '../constants/levels';
import { createShakeAnimation, createFadeAnimation } from '../utils/animations';

interface CellProps {
  cell: CellType;
  selected: boolean;
  onPress: (cell: CellType) => void;
  invalidMatch?: boolean;
}

export default function Cell({ cell, selected, onPress, invalidMatch = false }: CellProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const getCellStyle = () => {
    if (cell.matched) {
      return 'bg-gray-300 border-gray-400';
    }
    if (selected) {
      return 'bg-yellow-300 border-yellow-500';
    }
    if (invalidMatch) {
      return 'bg-red-100 border-red-400';
    }
    return 'bg-white border-gray-300';
  };

  const getTextStyle = () => {
    if (cell.matched) {
      return 'text-gray-500';
    }
    if (selected) {
      return 'text-yellow-900 font-bold';
    }
    return 'text-gray-900';
  };

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: shakeAnim },
          { scale: scaleAnim },
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
          className={`flex-1 rounded-xl border-2 items-center justify-center ${getCellStyle()}`}
          style={{
            flex: 1,
            borderRadius: 12,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cell.matched 
              ? '#D1D5DB' 
              : selected 
              ? '#FDE047' 
              : invalidMatch 
              ? '#FEE2E2' 
              : '#FFFFFF',
            borderColor: cell.matched 
              ? '#9CA3AF' 
              : selected 
              ? '#EAB308' 
              : invalidMatch 
              ? '#F87171' 
              : '#D1D5DB',
          }}
        >
          <Text 
            className={`text-2xl font-bold ${getTextStyle()}`}
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

