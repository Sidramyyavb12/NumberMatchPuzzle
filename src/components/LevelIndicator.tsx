import React from 'react';
import { View, Text } from 'react-native';
import { GameLevel } from '../types/game.types';

interface LevelIndicatorProps {
  level: GameLevel;
  matchedPairs: number;
}

export default function LevelIndicator({ level, matchedPairs }: LevelIndicatorProps) {
  const totalCells = level.rows * level.cols;
  const totalPairs = totalCells / 2;
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <View 
      style={{
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#2E7D32',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text 
        style={{ 
          color: '#FFFFFF', 
          fontSize: 20, 
          fontWeight: '900', 
          textAlign: 'center',
          textShadowColor: '#2E7D32',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      >
        🎮 {level.name}
      </Text>
      <Text 
        style={{ 
          color: '#E8F5E9', 
          fontSize: 14, 
          textAlign: 'center', 
          marginTop: 6,
          fontWeight: '600',
        }}
      >
        Matched: {matchedPairs}/{totalPairs} pairs
      </Text>
      <View 
        style={{
          backgroundColor: '#C8E6C9',
          height: 12,
          borderRadius: 9999,
          marginTop: 10,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: '#81C784',
        }}
      >
        <View
          style={{ 
            backgroundColor: '#FFD54F',
            height: '100%',
            borderRadius: 9999,
            width: `${progress}%`,
            borderWidth: 1,
            borderColor: '#FFC107',
          }}
        />
      </View>
    </View>
  );
}

