import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface HintButtonProps {
  onPress: () => void;
  disabled: boolean;
  hintsUsed: number;
  maxHints?: number;
}

export default function HintButton({
  onPress,
  disabled,
  hintsUsed,
  maxHints = 5,
}: HintButtonProps) {
  const canUseHint = !disabled && hintsUsed < maxHints;
  
  return (
    <Pressable
      onPress={onPress}
      disabled={!canUseHint}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 9999,
        backgroundColor: canUseHint ? '#3B82F6' : '#9CA3AF',
        borderWidth: 2,
        borderColor: canUseHint ? '#2563EB' : '#6B7280',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: 18 }}>💡</Text>
        <Text 
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Hint {hintsUsed}/{maxHints}
        </Text>
      </View>
    </Pressable>
  );
}

