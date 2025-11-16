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
        backgroundColor: '#A855F7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
      }}
    >
      <Text 
        style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
      >
        {level.name}
      </Text>
      <Text 
        style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center', marginTop: 4 }}
      >
        Matched: {matchedPairs}/{totalPairs} pairs
      </Text>
      <View 
        style={{
          backgroundColor: '#D1D5DB',
          height: 8,
          borderRadius: 9999,
          marginTop: 8,
          overflow: 'hidden',
        }}
      >
        <View
          style={{ 
            backgroundColor: '#FACC15',
            height: '100%',
            borderRadius: 9999,
            width: `${progress}%` 
          }}
        />
      </View>
    </View>
  );
}

