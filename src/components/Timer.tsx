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
      className="bg-blue-500 px-6 py-3 rounded-full"
      style={{
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 9999,
      }}
    >
      <Text
        className={`text-2xl font-bold ${
          isCriticalTime
            ? 'text-red-100'
            : isLowTime
            ? 'text-yellow-100'
            : 'text-white'
        }`}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: isCriticalTime ? '#FEE2E2' : isLowTime ? '#FEF3C7' : '#FFFFFF',
        }}
      >
        ⏱️ {formatTime(timeLeft)}
      </Text>
    </View>
  );
}

