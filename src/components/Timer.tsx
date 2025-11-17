import React from 'react';
import { View, Text } from 'react-native';

interface TimerProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export default function Timer({ timeLeft, formatTime }: TimerProps) {
  const isLowTime = timeLeft <= 30;
  const isCriticalTime = timeLeft <= 10;

  return (
    <View 
      style={{
        backgroundColor: isCriticalTime ? '#F44336' : isLowTime ? '#FF9800' : '#66BB6A',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: isCriticalTime ? '#C62828' : isLowTime ? '#F57C00' : '#4CAF50',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: '900',
          color: '#FFFFFF',
          textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,
        }}
      >
        ⏱️ {formatTime(timeLeft)}
      </Text>
    </View>
  );
}

